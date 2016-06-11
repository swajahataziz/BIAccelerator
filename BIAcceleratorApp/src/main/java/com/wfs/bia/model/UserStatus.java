package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
public enum UserStatus {

    ACTIVE("1"),
    INACTIVE("2");


    private String statusId;

    private UserStatus(String statusId) {
        this.statusId = statusId;
    }

    public String toString() {
        return this.statusId;
    }

}
