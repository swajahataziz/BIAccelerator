package com.wfs.bia.cognos;

/**
 * Created by wajahat on 28/02/2016.
 */
import com.cognos.developer.schemas.bibus._3.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.swing.*;
import javax.xml.namespace.QName;
import javax.xml.rpc.ServiceException;

import com.sun.xml.internal.fastinfoset.util.StringArray;
import org.apache.axis.client.Stub;
import org.apache.axis.message.SOAPHeaderElement;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;


public class CognosSDKImp {


    @Autowired
    private SimpleCognosConnetion cognosConnetion;
    ReportService_PortType reportService = cognosConnetion.getReportService();




    public String runReport(String reportPath,
                            String reportName,
                            CognosReportFormat reportFormat,
                            HashMap<String,ArrayList<String>> params) throws RemoteException {


        SearchPathSingleObject reportPathObj = new SearchPathSingleObject();
        reportPathObj.set_value(reportPath);

        Option[] runOptions = new Option[4];

        RunOptionBoolean saveOutput = new RunOptionBoolean();
        saveOutput.setName(RunOptionEnum.saveOutput);
        saveOutput.setValue(false);
        runOptions[0] = saveOutput;

        // Specify the output format.
        RunOptionStringArray outputFormat = new RunOptionStringArray();
        outputFormat.setName(RunOptionEnum.outputFormat);
        outputFormat.setValue(new String[] { reportFormat.toString() });
        runOptions[1] = outputFormat;

        // Set the report not to prompt as we pass the parameters if any
        RunOptionBoolean rop = new RunOptionBoolean();
        rop.setName(RunOptionEnum.prompt);
        rop.setValue(false);
        runOptions[2] = rop;

        RunOptionInt maxRows = new RunOptionInt();
        maxRows.setName(RunOptionEnum.verticalElements);
        maxRows.setValue(0);
        runOptions[3] = maxRows;


        SearchPathSingleObject cognosReportPath = new SearchPathSingleObject(reportPath);
        ParameterValue[] reportParameters = setReportParameters(params);

        AsynchReply asynchReply = reportService.run(reportPathObj, reportParameters, runOptions);


        // If response is not immediately complete, call wait until complete
        if (!asynchReply.getStatus().equals(AsynchReplyStatusEnum.complete)
                && !asynchReply.getStatus().equals(
                AsynchReplyStatusEnum.conversationComplete)) {
            while (!asynchReply.getStatus().equals(
                    AsynchReplyStatusEnum.complete)
                    && !asynchReply.getStatus().equals(
                    AsynchReplyStatusEnum.conversationComplete)) {
                // before calling wait, double check that it is okay
                if (hasSecondaryRequest(asynchReply, "wait")) {
                    asynchReply = reportService.wait(
                            asynchReply.getPrimaryRequest(),
                            new ParameterValue[] {}, new Option[] {});
                } else {
                    System.out
                            .println("Error: Wait method not available as expected.");
                    return "An Error occured while processing the report";
                }
            }


            if(!this.outputIsReady(asynchReply)) {
                throw new IllegalStateException("Failed to generate report output");
            }

            asynchReply = reportService.getOutput(
                    asynchReply.getPrimaryRequest(),
                    new ParameterValue[] {}, new Option[] {});
        }


        AsynchDetailReportOutput reportOutput = null;

        for (int i = 0; i < asynchReply.getDetails().length; i++) {
            if (asynchReply.getDetails()[i] instanceof AsynchDetailReportOutput) {
                reportOutput = (AsynchDetailReportOutput) asynchReply
                        .getDetails()[i];
                break;
            }
        }
        String data = reportOutput.getOutputPages()[0].toString();

        String result = new String(data.getBytes());

        // release the conversation to free resources.
        if (hasSecondaryRequest(asynchReply, "release")) {
            System.out.println("Releasing resources");
            reportService.release(asynchReply.getPrimaryRequest());
        }

        return result;
    }


    public boolean outputIsReady(AsynchReply asynchReply) {
        for (int i = 0; i < asynchReply.getDetails().length; i++) {
            if ((asynchReply.getDetails()[i] instanceof AsynchDetailReportStatus)
                    && (((AsynchDetailReportStatus) asynchReply.getDetails()[i]).getStatus() == AsynchDetailReportStatusEnum.responseReady)
                    && (hasSecondaryRequest(asynchReply, "getOutput"))) {
                return true;
            }
        }

        return false;
    }

    public boolean hasSecondaryRequest(AsynchReply response,
                                       String secondaryRequest) {
        AsynchSecondaryRequest[] secondaryRequests = response
                .getSecondaryRequests();
        for (int i = 0; i < secondaryRequests.length; i++) {
            if (secondaryRequests[i].getName().compareTo(secondaryRequest) == 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Assign values to each parameter for the specified report.
     * @param params
     *        Specifies a parameter map.
     * @return params
     *        Returns an array of parameter values.
     */

    public ParameterValue[] setReportParameters(HashMap<String,ArrayList<String>> params) {

        //Create a new parameter value array
        ParameterValue[] parameterValues =
                new ParameterValue[] {};

        //Check if there are any parameters defined for the report
        if (params.size() >0 ) {


            //Parameter value index
            int i = 0;

            //Loop through the multimap to handle each report parameter
            for (Map.Entry<String, ArrayList<String>> param: params.entrySet()) {

                // Construct a new parameter value item array
                ParmValueItem pvi[] = new ParmValueItem[] {};

                    String key = param.getKey();
                    ArrayList<String> singleParamValues = param.getValue();

                //Check of its a multi-value parameter
                if (singleParamValues.size() > 1){


                    //Convert each single parameter value to a Cognos SimpleParmValueItem
                    for (int n=0; n < singleParamValues.size(); n++) {

                        SimpleParmValueItem item = new SimpleParmValueItem();
                        item.setUse(singleParamValues.get(n));
                        //Add the SimpleParmValueItem to the ParmValueItem array of the report parameter
                        pvi[n] = item;
                    }


                } else { //If its a single value parameter

                    SimpleParmValueItem item = new SimpleParmValueItem();
                    item.setUse(singleParamValues.get(0));
                    //Add the SimpleParmValueItem to the ParmValueItem array of the report parameter
                    pvi[0] = item;

                }

                parameterValues[i] = new ParameterValue();
                parameterValues[i].setName(key);
                parameterValues[i].setValue(pvi);


                i++;
            }

        }
        return parameterValues;
    }


    public static ParameterValue[] setReportParameters(BaseParameter[] prm)
    {
        try
        {
            int numberOfParameters = 0;

            // Select the parameter values for the specified report.
            if (prm.length > 0)
            {
                numberOfParameters = prm.length;

                ParameterValue[] params =
                        new ParameterValue[numberOfParameters];

                // Repeat for each parameter.
                for (int i = 0; i < prm.length; i++)
                {
                    // Prompt the user to type a value for the parameter.
                    // If the value is DateTime, the format must be in the ISO 8601
                    // format. For example, a date and time of 2001-05-31T14:39:25.035Z
                    // represents the thirty-first day of May in the year 2001. The time,
                    // measured in Coordinated Universal Time (UTC) as indicated by the Z,
                    // is 14 hours, 39 minutes, 25 seconds, and 35 milliseconds.
                    String modelFilterItem = ((Parameter)prm[i]).getModelFilterItem();
                    String item =
                            modelFilterItem.substring(
                                    modelFilterItem.lastIndexOf("["),
                                    modelFilterItem.lastIndexOf("]") + 1);
                    String inputValue =
                            JOptionPane.showInputDialog(
                                    "Please input a value for "
                                            + item
                                            + " of datatype ["
                                            + prm[i].getType().getValue()
                                            + "]");

                    SimpleParmValueItem item1 = new SimpleParmValueItem();
                    item1.setUse(inputValue);

                    // Create a new array to contains the values for the parameter.
                    ParmValueItem pvi[] = new ParmValueItem[1];
                    pvi[0] = item1;

                    // Assign the values to the parameter.
                    params[i] = new ParameterValue();
                    params[i].setName(prm[i].getName());
                    params[i].setValue(pvi);
                }
                return params;
            }
            else
            {
                return null;
            }
        }
        catch (Exception e)
        {
            System.out.println(e);
            return null;
        }
    }


    /**
     * Assign values to each parameter for the specified report.
     * @param reportPathObj
     *        Specifies an array of parameters.
     * @return params
     *        Returns an array of parameter values.
     */

    public ParameterValue[] getReportParameters(SearchPathSingleObject reportPathObj) throws RemoteException {

        BaseParameter params[] = new Parameter[] {};
        ParameterValue[] parameters = new ParameterValue[2];
        AsynchReply response;
            // Get the report parameters name.
            response = cognosConnetion.getReportService(true,"").getParameters(reportPathObj,
                    new ParameterValue[] {}, new Option[] {});
            // If response is not immediately complete, call wait until complete
            if (!response.getStatus().equals(
                    AsynchReplyStatusEnum.conversationComplete)) {
                while (!response.getStatus().equals(
                        AsynchReplyStatusEnum.conversationComplete)) {
                    response = reportService.wait(
                            response.getPrimaryRequest(),
                            new ParameterValue[]{}, new Option[]{});
                }

            }

            for (int i = 0; i < response.getDetails().length; i++) {
                if (response.getDetails()[i] instanceof AsynchDetailParameters)

                {
                    params = ((AsynchDetailParameters) response.getDetails()[i])
                            .getParameters();
                }
            }

            for (int i = 0; i < params.length; i++){

                parameters[i] = new ParameterValue();
                parameters[i].setName(params[i].getName());
            }

            return parameters;
        }


    /**
     *
     * This Java method calls the getParameters IBM Cognos 8 SDK method to
     * to return the list of parameters used by the report.
     *
     * @param connection
     *        Specifies the object that provides the Connection to IBM Cognos 8.
     * @param reportPath
     *        Specifies the search path of the report.
     * @return
     *        Returns an array of report parameters.
     */
/*
    public BaseParameter[] getReportParameters(
            BaseClassWrapper report,
            CRNConnect connection)
            throws java.rmi.RemoteException
    {

        BaseParameter params[] = new Parameter[] {};
        AsynchReply response;
        String reportPathString = report.getBaseClassObject().getSearchPath().getValue();
        SearchPathSingleObject reportPath = new SearchPathSingleObject();
        reportPath.setValue(reportPathString);

        // sn_dg_sdk_method_reportService_getParameters_start_1
        response = connection.getReportService().getParameters(reportPath, new ParameterValue[] {}, new Option[] {} );
        // sn_dg_sdk_method_reportService_getParameters_end_1

        // If response is not immediately complete, call wait until complete
        if (!response.getStatus().equals(AsynchReplyStatusEnum.conversationComplete))
        {
            while (!response.getStatus().equals(AsynchReplyStatusEnum.conversationComplete))
            {
                response = connection.getReportService().wait(
                        response.getPrimaryRequest(),
                        new ParameterValue[] {},
                        new Option[] {});
            }

        }

        // sn_dg_sdk_method_reportService_getParameters_start_2
        for (int i = 0; i < response.getDetails().length; i++)
        {
            if (response.getDetails()[i] instanceof AsynchDetailParameters)

            {
                params = ((AsynchDetailParameters)response.getDetails()[i]).getParameters();
            }
        }
*/

}
