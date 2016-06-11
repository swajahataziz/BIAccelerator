package com.wfs.bia.cognos;

import org.springframework.beans.factory.annotation.Value;

/**
 * Created by wajahat on 28/02/2016.
 */
public class CognosConfigConstants {

    public final static String BIBUS_NS = "http://developer.cognos.com/schemas/bibus/3/";

    public final static String BIBUS_HDR = "biBusHeader";

    public final static String CAM_PASSPORT_COOKIE = "cam_passport";


    @Value("${NETWORK_DOMAIN}")
    private String domain;

    @Value("${COGNOS_GATEWAY}")
    private String cognosGateway;

    @Value("${COGNOS_DISPATCHER}")
    private String cognosDispatcher;

    @Value("${COGNOS_NAMESPACE_ARRAY}")
    private String nameSpaceArray;

    @Value("${CMS_TIMEOUT}")
    private int cmsTimeOut;

    @Value("${COGNOS_SDK_USERNAME}")
    private String sdkUserName;

    @Value("${COGNOS_SDK_PASSWORD}")
    private String sdkPassword;

    @Value("${COGNOS_SDK_NAMESPACE}")
    private String sdkNamespace;

    public String getCognosGateway()
    {
        return cognosGateway;
    }

    public void setCognosGateway(String gatewayURL)
    {
        this.cognosGateway = gatewayURL;
    }

    public String getCognosDispatcher()
    {
        return cognosDispatcher;
    }

    public void setCognosDispatcher(String dispatherURL)
    {
        this.cognosDispatcher = dispatherURL;
    }

    public void setNameSpaceArray(String nameSpaceArray)
    {
        this.nameSpaceArray = nameSpaceArray;
    }

    public String getNameSpaceArray()
    {
        return nameSpaceArray;
    }

    public int getCmsTimeOut()
    {
        return cmsTimeOut;
    }

    public void setCmsTimeOut(int cmsTimeOut)
    {
        this.cmsTimeOut = cmsTimeOut;
    }


    public String getSdkUserName() {
        return sdkUserName;
    }

    public void setSdkUserName(String sdkUserName) {
        this.sdkUserName = sdkUserName;
    }

    public String getSdkPassword() {
        return sdkPassword;
    }

    public void setSdkPassword(String sdkPassword) {
        this.sdkPassword = sdkPassword;
    }

    public String getSdkNamespace() {
        return sdkNamespace;
    }

    public void setSdkNamespace(String sdkNamespace) {
        this.sdkNamespace = sdkNamespace;
    }
}
