package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
public enum UserRole {

    REPORT_USER("1"),
    ADMINISTRATOR("2");

    private String roleId;

    private UserRole(String roleId) {
        this.roleId = roleId;
    }

    public String toString() {
        return this.roleId;
    }

    }
