package com.wfs.bia.model;

import org.joda.time.DateTime;

import java.util.List;

/**
 * Created by wajahat on 05/03/2016.
 */
public class SubSite {

    private String subSiteId;
    private String subSiteName;
    private String subSiteDescription;
    private boolean isActive;
    private boolean isTemplate;
    private DateTime dateCreated;
    private DateTime dateActivated;
    private String createdBy;
    private List<SubSitePart> subSiteParts;


    public String getSubSiteId() {
        return subSiteId;
    }

    public void setSubSiteId(String subSiteId) {
        this.subSiteId = subSiteId;
    }

    public String getSubSiteName() {
        return subSiteName;
    }

    public void setSubSiteName(String subSiteName) {
        this.subSiteName = subSiteName;
    }

    public String getSubSiteDescription() {
        return subSiteDescription;
    }

    public void setSubSiteDescription(String subSiteDescription) {
        this.subSiteDescription = subSiteDescription;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public boolean isTemplate() {
        return isTemplate;
    }

    public void setTemplate(boolean isTemplate) {
        this.isTemplate = isTemplate;
    }

    public DateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(DateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public DateTime getDateActivated() {
        return dateActivated;
    }

    public void setDateActivated(DateTime dateActivated) {
        this.dateActivated = dateActivated;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public List<SubSitePart> getSubSiteParts() {
        return subSiteParts;
    }

    public void setSubSiteParts(List<SubSitePart> subSiteParts) {
        this.subSiteParts = subSiteParts;
    }
}
