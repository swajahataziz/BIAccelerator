package com.wfs.bia.model;

import java.util.List;

/**
 * Created by wajahat on 27/02/2016.
 */
public class BookmarkFolder implements Folder {

    private int folderId;
    private String folderName;
    private int parentFolderId;
    private String parentFolderName;
    private int folderOrder;
    private int siteId;
    private User owner;
    private boolean isShared;
    private List<Bookmark> bookmarks;

    @Override
    public int getFolderId() {
        return folderId;
    }

    @Override
    public void setFolderId(int folderId) {
        this.folderId = folderId;
    }

    @Override
    public String getFolderName() {
        return folderName;
    }

    @Override
    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    @Override
    public int getParentFolderId() {
        return parentFolderId;
    }

    @Override
    public void setParentFolderId(int parentFolderId) {
        this.parentFolderId = parentFolderId;
    }

    @Override
    public String getParentFolderName() {
        return parentFolderName;
    }

    @Override
    public void setParentFolderName(String parentFolderName) {
        this.parentFolderName = parentFolderName;
    }

    @Override
    public int getFolderOrder() {
        return folderOrder;
    }

    @Override
    public void setFolderOrder(int folderOrder) {
        this.folderOrder = folderOrder;
    }

    @Override
    public User getOwner() {
        return owner;
    }

    @Override
    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public boolean isShared() {
        return isShared;
    }

    @Override
    public void setShared(boolean isShared) {
        this.isShared = isShared;
    }

    @Override
    public int getSiteId() {
        return siteId;
    }

    @Override
    public void setSiteId(int siteId) {
        this.siteId = siteId;
    }

    public void setBookmarks(List<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public List<Bookmark> getBookmarks() {
        return bookmarks;
    }
}
