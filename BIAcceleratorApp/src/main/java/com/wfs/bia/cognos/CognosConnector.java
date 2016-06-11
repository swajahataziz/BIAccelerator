package com.wfs.bia.cognos;

import javax.xml.rpc.ServiceException;
import java.net.MalformedURLException;

/**
 * Created by wajahat on 28/02/2016.
 */
public interface CognosConnector {

    public void connect() throws MalformedURLException, ServiceException;

    public void login();

    public void logoff();

}
