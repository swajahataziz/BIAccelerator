package com.wfs.bia.model;

import org.joda.time.DateTime;

/**
 * Created by wajahat on 05/03/2016.
 */
public interface SiteContent {

    public int getContentId();

    public void setContentId(int contentId);

    public String getContentName();

    public void setContentName(String contentName);

    public ContentType getContentType();

    public String getCreatedBy();

    public void setCreatedBy(String createdBy);

    public DateTime getDateModified();

    public void setDateModified(DateTime dateModified);

    public String getContentLocation();

    public void setContentLocation(String contentLocation);

}
