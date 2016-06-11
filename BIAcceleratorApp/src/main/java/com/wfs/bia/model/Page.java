package com.wfs.bia.model;

import org.joda.time.DateTime;

/**
 * Created by wajahat on 27/02/2016.
 */
public class Page implements SiteContent {

    private int pageId;
    private String pageName;
    private String createdBy;
    private ContentType contentType;
    private DateTime dateModified;
    private String contentLocation;

    public Page() {
        this.contentType = ContentType.HTML_PAGE;
    }

    @Override
    public int getContentId() {
        return pageId;
    }

    @Override
    public void setContentId(int pageId) {
        this.pageId = pageId;
    }

    @Override
    public String getContentName() {
        return pageName;
    }

    @Override
    public void setContentName(String pageName) {
        this.pageName = pageName;
    }

    @Override
    public ContentType getContentType() {
        return this.contentType;
    }

    @Override
    public String getCreatedBy() {
        return createdBy;
    }

    @Override
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public DateTime getDateModified() {
        return dateModified;
    }

    @Override
    public void setDateModified(DateTime dateModified) {
        this.dateModified = dateModified;
    }

    @Override
    public String getContentLocation() {
        return contentLocation;
    }

    @Override
    public void setContentLocation(String contentLocation) {
        this.contentLocation = contentLocation;
    }
}
