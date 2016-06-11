package com.wfs.bia.model;

import org.joda.time.DateTime;

import java.util.Map;

/**
 * Created by wajahat on 27/02/2016.
 */
public class Report implements SiteContent{

    private int contentId;
    private String contentName;
    private String createdBy;
    private ContentType contentType;
    private DateTime dateModified;
    private String contentLocation;
    private Map<String, String> localFilters;
    private Map<String, String> globalFilters;
    private ReportType reportType;

    public Report() {
        this.contentType = ContentType.REPORT;
    }

    @Override
    public int getContentId() {
        return contentId;
    }

    @Override
    public void setContentId(int contentId) {
        this.contentId = contentId;
    }

    @Override
    public String getContentName() {
        return contentName;
    }

    @Override
    public void setContentName(String contentName) {
        this.contentName = contentName;
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
    public ContentType getContentType() {
        return contentType;
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

    public Map<String, String> getLocalFilters() {
        return localFilters;
    }

    public void setLocalFilters(Map<String, String> localFilters) {
        this.localFilters = localFilters;
    }

    public Map<String, String> getGlobalFilters() {
        return globalFilters;
    }

    public void setGlobalFilters(Map<String, String> globalFilters) {
        this.globalFilters = globalFilters;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }
}
