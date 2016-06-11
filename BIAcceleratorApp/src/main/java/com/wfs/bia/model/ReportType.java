package com.wfs.bia.model;

/**
 * Created by wajahat on 06/03/2016.
 */
public enum ReportType {

    HTMML_REPORT("1"),
    COGNOS_REPORT("2");

    private String reportTypeId;

    private ReportType(String reportTypeId) {
        this.reportTypeId = reportTypeId;
    }

    public String toString() {
        return this.reportTypeId;
    }

}
