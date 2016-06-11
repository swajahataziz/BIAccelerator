package com.wfs.bia.cognos;

import com.cognos.developer.schemas.bibus._3.*;
import org.apache.axis.client.Stub;
import org.apache.axis.message.SOAPHeaderElement;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.xml.namespace.QName;
import javax.xml.rpc.ServiceException;
import java.net.MalformedURLException;
import java.net.URL;
import java.rmi.RemoteException;

/**
 * Created by wajahat on 05/03/2016.
 */

@Component
public class SimpleCognosConnetion implements CognosConnector {

    private static ContentManagerService_ServiceLocator cmServiceLocator = null;
    private static ContentManagerService_PortType cmService = null;
    private ReportService_ServiceLocator reportServiceLocator = null;
    private ReportService_PortType reportService = null;
    private CognosConfigConstants cognosConfig;

    @Override
    public void connect() throws MalformedURLException, ServiceException {

            URL dispatcherUrl = new URL(cognosConfig.getCognosDispatcher());
            reportServiceLocator = new ReportService_ServiceLocator();
            reportService = reportServiceLocator.getreportService(dispatcherUrl);
            cmServiceLocator = new ContentManagerService_ServiceLocator();
            cmService = cmServiceLocator.getcontentManagerService(dispatcherUrl);
        }

    @Override
    public void login() {

        StringBuffer credentialXML = new StringBuffer();
        String uid = cognosConfig.getSdkUserName();
        String pwd = cognosConfig.getSdkPassword();
        String namespace = cognosConfig.getSdkNamespace();

        try {
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

    }

    public void logoff() {

        try {
            cmService.logoff();
        } catch (RemoteException e) {
            System.out.println("Failed to logoff from Cognos : " + e);
        }
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

}
