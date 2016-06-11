package com.wfs.bia.model;

import java.util.Map;

/**
 * Created by wajahat on 27/02/2016.
 */
public class Bookmark {

    private int bookmarkId;
    private String bookmarkName;
    private int siteId;
    private int reportId;
    private int bookmarkOrder;
    private String userId;
    private Map<String, String> localFilters;
    private Map<String, String> globalFilters;


    public int getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(int bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public String getBookmarkName() {
        return bookmarkName;
    }

    public void setBookmarkName(String bookmarkName) {
        this.bookmarkName = bookmarkName;
    }

    public int getSiteId() {
        return siteId;
    }

    public void setSiteId(int siteId) {
        this.siteId = siteId;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public int getBookmarkOrder() {
        return bookmarkOrder;
    }

    public void setBookmarkOrder(int bookmarkOrder) {
        this.bookmarkOrder = bookmarkOrder;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
}
