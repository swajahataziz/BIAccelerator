package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
public class ReportView {

    private String reportViewId;
    private String reportViewName;
    private int reportId;
    private User owner;
    private boolean isShared;
    private String siteId;

    public String getReportViewId() {
        return reportViewId;
    }

    public void setReportViewId(String reportViewId) {
        this.reportViewId = reportViewId;
    }

    public String getReportViewName() {
        return reportViewName;
    }

    public void setReportViewName(String reportViewName) {
        this.reportViewName = reportViewName;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public boolean isShared() {
        return isShared;
    }

    public void setShared(boolean isShared) {
        this.isShared = isShared;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }
}
