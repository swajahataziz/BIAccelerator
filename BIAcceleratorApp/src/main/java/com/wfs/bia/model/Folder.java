package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
public interface Folder {


    public int getFolderId();

    public void setFolderId(int folderId);

    public String getFolderName();

    public void setFolderName(String foldername);

    public int getParentFolderId();

    public void setParentFolderId(int parentFolderId);

    public String getParentFolderName();

    public void setParentFolderName(String parentFolderName);

    public int getFolderOrder();

    public void setFolderOrder(int FolderOrder);

    public int getSiteId();

    public void setSiteId(int siteId);

    public User getOwner();

    public void setOwner(User owner);

    public boolean isShared();

    public void setShared(boolean isShared);


}
