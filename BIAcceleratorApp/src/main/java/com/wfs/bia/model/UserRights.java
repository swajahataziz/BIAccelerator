package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
public enum UserRights {

    ACTIVE("1"),

    CONTENT_MANAGEMENT("2"),
    ADMINISTRATOR("3"),
    BOOKMARK_EDIT_SELF("4"),
    BOOKMARK_EDIT_ALL("5"),
    COMMUNITY_SELF("6"),
    COMMENTS_ALL("7"),
    COGNOS_STUDIOS("8");

    private String id;

    private UserRights(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

}

