package com.wfs.bia.model;

import org.joda.time.DateTime;

import java.util.List;

/**
 * Created by wajahat on 05/03/2016.
 */
public class SubSitePart {

    private String subsitePartId;
    private String subsitePartName;
    private String subsitePartDescription;
    private int subsiteIndex;
    private DateTime dateCreated;
    private DateTime dateModified;
    private String lastModifiedBy;

    private String subsitePartConfig;
    private List<String> subsiteFilters;
    private List<String> subsiteSecurityGroups;
    private List<SiteContent> subsiteContents;


    public String getSubsitePartId() {
        return subsitePartId;
    }

    public void setSubsitePartId(String subsitePartId) {
        this.subsitePartId = subsitePartId;
    }

    public String getSubsitePartName() {
        return subsitePartName;
    }

    public void setSubsitePartName(String subsitePartName) {
        this.subsitePartName = subsitePartName;
    }

    public String getSubsitePartDescription() {
        return subsitePartDescription;
    }

    public void setSubsitePartDescription(String subsitePartDescription) {
        this.subsitePartDescription = subsitePartDescription;
    }

    public int getSubsiteIndex() {
        return subsiteIndex;
    }

    public void setSubsiteIndex(int subsiteIndex) {
        this.subsiteIndex = subsiteIndex;
    }

    public DateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(DateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public DateTime getDateModified() {
        return dateModified;
    }

    public void setDateModified(DateTime dateModified) {
        this.dateModified = dateModified;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getSubsitePartConfig() {
        return subsitePartConfig;
    }

    public void setSubsitePartConfig(String subsitePartConfig) {
        this.subsitePartConfig = subsitePartConfig;
    }

    public List<String> getSubsiteFilters() {
        return subsiteFilters;
    }

    public void setSubsiteFilters(List<String> subsiteFilters) {
        this.subsiteFilters = subsiteFilters;
    }

    public List<String> getSubsiteSecurityGroups() {
        return subsiteSecurityGroups;
    }

    public void setSubsiteSecurityGroups(List<String> subsiteSecurityGroups) {
        this.subsiteSecurityGroups = subsiteSecurityGroups;
    }

    public List<SiteContent> getSubsiteContents() {
        return subsiteContents;
    }

    public void setSubsiteContents(List<SiteContent> subsiteContents) {
        this.subsiteContents = subsiteContents;
    }
}
