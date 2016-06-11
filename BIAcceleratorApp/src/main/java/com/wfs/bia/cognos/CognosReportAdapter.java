package com.wfs.bia.cognos;

/**
 * Created by wajahat on 28/02/2016.
 */
import java.io.File;
import java.io.FileOutputStream;

import javax.xml.namespace.QName;

import org.apache.axis.client.Stub;
import org.apache.axis.message.SOAPHeaderElement;

import com.cognos.developer.schemas.bibus._3.AsynchDetailParameters;
import com.cognos.developer.schemas.bibus._3.AsynchDetailReportOutput;
import com.cognos.developer.schemas.bibus._3.AsynchDetailReportStatus;
import com.cognos.developer.schemas.bibus._3.AsynchDetailReportStatusEnum;
import com.cognos.developer.schemas.bibus._3.AsynchReply;
import com.cognos.developer.schemas.bibus._3.AsynchReplyStatusEnum;
import com.cognos.developer.schemas.bibus._3.AsynchSecondaryRequest;
import com.cognos.developer.schemas.bibus._3.BaseParameter;
import com.cognos.developer.schemas.bibus._3.BiBusHeader;
import com.cognos.developer.schemas.bibus._3.ContentManagerService_PortType;
import com.cognos.developer.schemas.bibus._3.ContentManagerService_ServiceLocator;
import com.cognos.developer.schemas.bibus._3.Option;
import com.cognos.developer.schemas.bibus._3.Parameter;
import com.cognos.developer.schemas.bibus._3.ParameterValue;
import com.cognos.developer.schemas.bibus._3.ParmValueItem;
import com.cognos.developer.schemas.bibus._3.ReportService_PortType;
import com.cognos.developer.schemas.bibus._3.ReportService_ServiceLocator;
import com.cognos.developer.schemas.bibus._3.RoutingInfo;
import com.cognos.developer.schemas.bibus._3.RunOptionBoolean;
import com.cognos.developer.schemas.bibus._3.RunOptionEnum;
import com.cognos.developer.schemas.bibus._3.RunOptionInt;
import com.cognos.developer.schemas.bibus._3.RunOptionStringArray;
import com.cognos.developer.schemas.bibus._3.SearchPathSingleObject;
import com.cognos.developer.schemas.bibus._3.SimpleParmValueItem;
import com.cognos.developer.schemas.bibus._3.XmlEncodedXML;

public class CognosReportAdapter {

    public ReportService_PortType reportService = null;
    public ContentManagerService_PortType cmService = null;
    public String savePath = null; // path where to save the resulting output.

    public final String WIN_PATH = "rundll32";// path to the default system
    // browser for Windows.
    public final String WIN_FLAG = "url.dll,FileProtocolHandler"; // Create a
    // flag to
    // display a
    // URL.

    public void executeMultipleParameters(String sendPoint, String cognosLocation) {
        // Connect to Cognos service
        String endPoint = sendPoint;
        savePath = cognosLocation;
        ReportService_ServiceLocator reportServiceLocator = new ReportService_ServiceLocator();
        ContentManagerService_ServiceLocator cmServiceLocator = new ContentManagerService_ServiceLocator();

        try {
            cmService = cmServiceLocator
                    .getcontentManagerService(new java.net.URL(endPoint));
            reportService = reportServiceLocator
                    .getreportService(new java.net.URL(endPoint));
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    /**
     * Logon to Cognos
     *
     *@param namespace
     *            - Namespace id
     *@param uid
     *            - User id
     *@param pwd
     *            - password
     */
    public String quickLogon(String namespace, String uid, String pwd) {
        try {
            StringBuffer credentialXML = new StringBuffer();

            credentialXML.append("<credential>");
            credentialXML.append("<namespace>").append(namespace).append(
                    "</namespace>");
            credentialXML.append("<username>").append(uid)
                    .append("</username>");
            credentialXML.append("<password>").append(pwd)
                    .append("</password>");
            credentialXML.append("</credential>");

            String encodedCredentials = credentialXML.toString();

            cmService.logon(new XmlEncodedXML(encodedCredentials), null);

            SOAPHeaderElement temp = ((Stub) cmService).getResponseHeader(
                    "http://developer.cognos.com/schemas/bibus/3/",
                    "biBusHeader");
            BiBusHeader cmBiBusHeader = (BiBusHeader) temp
                    .getValueAsType(new QName(
                            "http://developer.cognos.com/schemas/bibus/3/",
                            "biBusHeader"));
            ((Stub) cmService).setHeader(
                    "http://developer.cognos.com/schemas/bibus/3/",
                    "biBusHeader", cmBiBusHeader);

        } catch (Exception e) {
            System.out.println(e);
        }

        return ("Logon successful as " + uid);
    }

    /**
     * Execute a report with multiple parameters.
     *
     *@param reportPath
     *            - searchPath to report
     */
    public void executePromptReport(String reportPath) {

        BaseParameter params[] = new Parameter[] {};
        ParameterValue[] parameters = new ParameterValue[2];
        AsynchReply response;
        SearchPathSingleObject reportPathObj = new SearchPathSingleObject();
        reportPathObj.set_value(reportPath);
        try {
            // Get the report parameters name.
            response = getReportService().getParameters(reportPathObj,
                    new ParameterValue[] {}, new Option[] {});
            // If response is not immediately complete, call wait until complete
            if (!response.getStatus().equals(
                    AsynchReplyStatusEnum.conversationComplete)) {
                while (!response.getStatus().equals(
                        AsynchReplyStatusEnum.conversationComplete)) {
                    response = getReportService().wait(
                            response.getPrimaryRequest(),
                            new ParameterValue[] {}, new Option[] {});
                }

            }

            for (int i = 0; i < response.getDetails().length; i++) {
                if (response.getDetails()[i] instanceof AsynchDetailParameters)

                {
                    params = ((AsynchDetailParameters) response.getDetails()[i])
                            .getParameters();
                }
            }

            // this report only has two parameters - otherwise we would have to
            // loop here.

            SimpleParmValueItem item = new SimpleParmValueItem();
            item.setUse("Tents"); // hard coded value for the parameter.
            item.setDisplay("Tents");
            item.setInclusive(true);

            ParmValueItem[] pvi = new ParmValueItem[1];
            pvi[0] = item;

            ParmValueItem[] pviABC = new ParmValueItem[3];
            String[] textValue = new String[] { "Star Peg", "Star Dome",
                    "Star Lite" };
            for (int i = 0; i < 3; i++) {
                SimpleParmValueItem itemA = new SimpleParmValueItem();
                itemA.setUse(textValue[i]); // hard coded value for the
                // parameter.
                itemA.setDisplay(textValue[i]);
                itemA.setInclusive(true);
                pviABC[i] = itemA;
            }

            parameters[0] = new ParameterValue();
            parameters[0].setName(params[0].getName());
            parameters[0].setValue(pvi);

            parameters[1] = new ParameterValue();
            parameters[1].setName(params[1].getName());
            parameters[1].setValue(pviABC);

            Option[] runOptions = new Option[4];

            RunOptionBoolean saveOutput = new RunOptionBoolean();
            saveOutput.setName(RunOptionEnum.saveOutput);
            saveOutput.setValue(false);
            runOptions[0] = saveOutput;

            // Specify the output format.
            RunOptionStringArray outputFormat = new RunOptionStringArray();
            outputFormat.setName(RunOptionEnum.outputFormat);
            outputFormat.setValue(new String[] { "HTML" });
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

            // Run the report
            response = getReportService().run(reportPathObj, parameters,
                    runOptions);

            // If response is not immediately complete, call wait until complete
            if (!response.getStatus().equals(AsynchReplyStatusEnum.complete)
                    && !response.getStatus().equals(
                    AsynchReplyStatusEnum.conversationComplete)) {
                while (!response.getStatus().equals(
                        AsynchReplyStatusEnum.complete)
                        && !response.getStatus().equals(
                        AsynchReplyStatusEnum.conversationComplete)) {
                    // before calling wait, double check that it is okay
                    if (hasSecondaryRequest(response, "wait")) {
                        response = getReportService().wait(
                                response.getPrimaryRequest(),
                                new ParameterValue[] {}, new Option[] {});
                    } else {
                        System.out
                                .println("Error: Wait method not available as expected.");
                        return;
                    }
                }
                // check if output is ready
                int i;
                for (i = 0; i < response.getDetails().length; i++) {
                    if ((response.getDetails()[i] instanceof AsynchDetailReportStatus)
                            && (((AsynchDetailReportStatus) response
                            .getDetails()[i]).getStatus() == AsynchDetailReportStatusEnum.responseReady)
                            && (hasSecondaryRequest(response, "getOutput"))) {
                        response = getReportService().getOutput(
                                response.getPrimaryRequest(),
                                new ParameterValue[] {}, new Option[] {});
                        break;
                    }

                }
                // if output is not ready return to main
                if (i == 3) {
                    System.out.println("Output was not generated");
                    return;
                }
            }

            AsynchDetailReportOutput reportOutput = null;

            for (int i = 0; i < response.getDetails().length; i++) {
                if (response.getDetails()[i] instanceof AsynchDetailReportOutput) {
                    reportOutput = (AsynchDetailReportOutput) response
                            .getDetails()[i];
                    break;
                }
            }
            String[] data = reportOutput.getOutputPages();
            // Write the report output to a temporary file and print the output
            // to stdout
            File oFile = new File(savePath + "\\temp.html");
            FileOutputStream fos = new FileOutputStream(oFile);
            fos.write(data[0].getBytes());
            fos.flush();
            fos.close();

            // release the conversation to free resources.
            if (hasSecondaryRequest(response, "release")) {
                System.out.println("Releasing resources");
                getReportService().release(response.getPrimaryRequest());
            }

            // Display the file in the default browser
            String fullReportCmd = WIN_PATH + " " + WIN_FLAG + " " + savePath
                    + "\\temp.html";
            System.out.println("Getting ready to execute " + fullReportCmd);
            Runtime.getRuntime().exec(fullReportCmd);
        } catch (Exception ex) {
            System.out.println(ex);
            ex.printStackTrace();
        }
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

    public ReportService_PortType getReportService(boolean isNewConversation,
                                                   String RSGroup) {

        BiBusHeader bibus = null;
        bibus = getHeaderObject(((Stub) reportService).getResponseHeader(
                        "http://developer.cognos.com/schemas/bibus/3/", "biBusHeader"),
                isNewConversation, RSGroup);

        if (bibus == null) {
            BiBusHeader CMbibus = null;
            CMbibus = getHeaderObject(((Stub) cmService).getResponseHeader(
                    "http://developer.cognos.com/schemas/bibus/3/",
                    "biBusHeader"), true, RSGroup);

            ((Stub) reportService).setHeader(
                    "http://developer.cognos.com/schemas/bibus/3/",
                    "biBusHeader", CMbibus);
        } else {
            ((Stub) reportService).clearHeaders();
            ((Stub) reportService).setHeader(
                    "http://developer.cognos.com/schemas/bibus/3/",
                    "biBusHeader", bibus);

        }

        return reportService;
    }

    // handle report service requests that do not specify new conversation for
    // backwards compatibility
    public ReportService_PortType getReportService() {

        return getReportService(false, "");

    }

    // Use this method when copying headers, such as for requests to services
    public static BiBusHeader getHeaderObject(SOAPHeaderElement SourceHeader,
                                              boolean isNewConversation, String RSGroup) {
        if (SourceHeader == null)
            return null;

        BiBusHeader bibus = null;
        try {
            bibus = (BiBusHeader) SourceHeader.getValueAsType(new QName(
                    "http://developer.cognos.com/schemas/bibus/3/",
                    "biBusHeader"));

            // If the header will be used for a new conversation, clear
            // tracking information, and set routing if supplied (clear if not)
            if (isNewConversation) {

                bibus.setTracking(null);

                // If a Routing Server Group is specified, direct requests to it
                if (RSGroup.length() > 0) {
                    RoutingInfo routing = new RoutingInfo(RSGroup);
                    bibus.setRouting(routing);
                } else {
                    bibus.setRouting(null);
                }
            }
        } catch (Exception e) {

            e.printStackTrace();
        }

        return bibus;
    }

/*
    public static void main(String[] args) {
        // Variable that is the search path to the report in the content store.
        String reportPath = "/content/folder[@name='test']/report[@name='Create a Detail Filter_2prompts']";
        // location where Cognos is installed.
        String cognosLocation =
                "d:\\Progra~1\\ibmcognos\\c10\\webcontent\\samples";

        // Variable that contains the default URL for Content Manager.
        String cognosEndPoint = "http://localhost:9300/p2pd/servlet/dispatch";

        executeMultipleParameters et = new executeMultipleParameters(
                cognosEndPoint, cognosLocation);
        // use anononymous logon, uncomment if logon is needed.
        et.quickLogon("nameSpaceID", "userName", "password");
        et.executePromptReport(reportPath);
    }
*/
}
