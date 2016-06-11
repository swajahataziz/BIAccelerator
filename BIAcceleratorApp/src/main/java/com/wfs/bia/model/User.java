package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
import java.util.HashMap;
import java.util.Map;

public class User {

    public static final String DEFAULT_NOTIFICATION_SETTINGS = "0,0,0,0";
    public static final String DEFAULT_TENANT = "BI Accelerator";

    private String userId;
    private String firstName;
    private String lastName;
    private UserStatus userStatus;
    private String email;
    private String title;
    private String subsitesVisited;
    private String language;
    private Map<UserRole, Map<UserRights, Boolean>> userPermissions;

    public User(String userId, String firstName, String lastName, UserStatus userStatus) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userStatus = userStatus;
        this.userPermissions = new HashMap();
        this.subsitesVisited = "";
        this.language = null;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public User setFirstName(String _name) {
        this.firstName = _name;
        return this;
    }

    public String getLastName() {
        return this.lastName;
    }

    public User setLastName(String _name) {
        this.lastName = _name;
        return this;
    }

    public UserStatus getUserStatus() {
        return this.userStatus;
    }

    public User setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
        return this;
    }

    public String getEmail() {
        return this.email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getTitle() {
        return this.title != null && !this.title.isEmpty()?this.title:"Title";
    }

    public User setTitle(String _title) {
        this.title = _title;
        return this;
    }

    public String getSubsitesVisited() {
        return this.subsitesVisited;
    }

    public User setSubsitesVisited(String subsitesVisited) {
        this.subsitesVisited = subsitesVisited;
        return this;
    }

    public String getLanguage() {
        return this.language;
    }

    public String setLanguage(String language) {
        return this.language;
    }

    public Map<UserRole, Map<UserRights, Boolean>> getUserPermissions() {
        return this.userPermissions;
    }

    public User setUserPermissions(Map<UserRole, Map<UserRights, Boolean>> userPermissions) {
        this.userPermissions = userPermissions;
        return this;
    }


}
