package com.wfs.bia.model;

/**
 * Created by wajahat on 27/02/2016.
 */
public class SitePart {

    private int sitePartId;
    private int width;
    private int length;
    //private Map<Integer, Integer> position;

    public int getSitePartId() {
        return sitePartId;
    }

    public void setSitePartId(int sitePartId) {
        this.sitePartId = sitePartId;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }
}
