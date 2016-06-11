package com.wfs.bia.utils;

/**
 * Created by wajahat on 21/02/2016.
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Email {

    public static final Logger log = LoggerFactory.getLogger(Email.class);
    private String from;
    private List<String> to;
    private List<String> cc;
    private List<String> bcc;
    private String subject;
    private String body;
    private List<File> attachments;

    private Email(String from, List<String> to, List<String> cc, List<String> bcc, String subject, String body, List<File> attachments) {
        this.from = from;
        this.to = to;
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.body = body;
        this.attachments = attachments;
    }

    public Email(String from, List<String> to) {
        this.from = from;
        this.to = to;
        this.cc= null;
        this.bcc = null;
        this.subject = null;
        this.body = null;
        this.attachments = null;
    }

    public Email(String from, String to, String subject, String body) {

        ArrayList<String> toList = new ArrayList<String>();

        this.from = from;
        this.to = toList;
        this.cc= null;
        this.bcc = null;
        this.subject = null;
        this.body = null;
        this.attachments = null;
    }

    public Email(String from, String to, String subject, String body, List<File> attachments) {
        ArrayList<String> toList = new ArrayList<String>();
        toList.add(to);

        this.from = from;
        this.to = toList;
        this.cc= null;
        this.bcc = null;
        this.subject = subject;
        this.body = body;
        this.attachments = attachments;
    }


    public void addBodyFromFile(File file, Map<String, String> credentials) throws IOException {
        this.body = this.readDataFromFile(file);

        Entry entry;
        for(Iterator var4 = credentials.entrySet().iterator(); var4.hasNext(); this.body = this.body.replaceAll((String)entry.getKey(), (String)entry.getValue())) {
            entry = (Entry)var4.next();
        }

    }

    private String readDataFromFile(File file) throws IOException {
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader(file));
            String ex = null;
            StringBuilder builder = new StringBuilder();

            while((ex = reader.readLine()) != null) {
                builder.append(ex);
            }

            String var6 = builder.toString();
            return var6;
        } catch (IOException var9) {
            log.error("Error while reading email template.", var9);
            throw var9;
        } finally {
            reader.close();
        }
    }

    public void addSubjectFromFile(File file, Map<String, String> credentials) throws IOException {
        this.subject = this.readDataFromFile(file);

        Entry entry;
        for(Iterator var4 = credentials.entrySet().iterator(); var4.hasNext(); this.subject = this.subject.replaceAll((String)entry.getKey(), (String)entry.getValue())) {
            entry = (Entry)var4.next();
        }

    }

    public void addAttachment(File file) {
        if(this.attachments == null) {
            this.attachments = new ArrayList();
        }

        this.attachments.add(file);
    }

    public void addCC(String email) {
        if(this.cc == null) {
            this.cc = new ArrayList();
        }

        this.cc.add(email);
    }

    public void addBCC(String email) {
        if(this.bcc == null) {
            this.bcc = new ArrayList();
        }

        this.bcc.add(email);
    }

    public String getFrom() {
        return this.from;
    }

    public List<String> getTo() {
        return this.to;
    }

    public List<String> getCc() {
        return this.cc;
    }

    public List<String> getBcc() {
        return this.bcc;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<File> getAttachments() {
        return this.attachments;
    }

}
