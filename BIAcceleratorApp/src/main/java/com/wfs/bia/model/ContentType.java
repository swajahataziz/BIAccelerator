package com.wfs.bia.model;

/**
 * Created by wajahat on 05/03/2016.
 */
public enum ContentType {

    REPORT("1"),
    HTML_PAGE("2");

    private String contentTypeId;

    private ContentType(String contentTypeId) {
        this.contentTypeId = contentTypeId;
    }

    public String toString() {
        return this.contentTypeId;
    }

}
