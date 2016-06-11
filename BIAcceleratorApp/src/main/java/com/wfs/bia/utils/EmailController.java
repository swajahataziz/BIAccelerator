package com.wfs.bia.utils;

/**
 * Created by wajahat on 21/02/2016.
 */

import com.sun.mail.smtp.SMTPTransport;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class EmailController {

    public static final String SMTP = "smtp";
    public static final String MAILER = "smtpsend";
    protected static final Logger log = LoggerFactory.getLogger(EmailController.class);
    private boolean verbose = false;
    private String user;
    private String password;
    private String mailhost;
    private String port;
    private boolean starttls;
    private boolean auth;
    private Session session;
    private EmailController.EmailType emailType;

    public EmailController(String user, String password, String mailhost, String port, boolean starttls, boolean auth, EmailController.EmailType emailType) {
        this.user = user;
        this.password = password;
        this.mailhost = mailhost;
        this.port = port;
        this.starttls = starttls;
        this.auth = auth;
        this.emailType = emailType;
        this.initialize();
    }

    public EmailController(String user, String password, String address, boolean starttls, boolean auth, EmailController.EmailType emailType) {
        this.user = user;
        this.password = password;
        String[] addressPieces = address.split(":");
        String port = "25";
        if(address.indexOf(":") > -1) {
            if(addressPieces[1].isEmpty()) {
                //############################ To Change ########################################

                log.warn("SMTP Port was detected as empty, using default instead.  Address given: [{}]  The likely fix is to remove the colon (:) from the string or add the port number after the colon.", address);
            } else {
                port = addressPieces[1];
            }
        }

        this.mailhost = addressPieces[0];
        this.port = port;
        this.starttls = starttls;
        this.auth = auth;
        this.emailType = emailType;
        this.initialize();
    }

    private void initialize() {
        Properties props = System.getProperties();
        if(this.mailhost != null) {
            props.put("mail.smtp.host", this.mailhost);
        }

        if(this.auth) {
            props.put("mail.smtp.auth", "true");
        }

        if(this.starttls) {
            props.put("mail.smtp.starttls.enable", "true");
        }

        if(this.port != null) {
            props.put("mail.smtp.port", this.port);
        }

        this.session = Session.getInstance(props, (Authenticator)null);
    }

    public void sendMessage(Email message) throws MessagingException, IOException {
        MimeMessage msg = new MimeMessage(this.session);
        InternetAddress addrs;
        if(message.getFrom() != null) {
            addrs = new InternetAddress(message.getFrom());
            addrs.validate();
            msg.setFrom(addrs);
        } else {
            msg.setFrom();
        }

        String t;
        Iterator mp;
        if(message.getTo() != null) {
            mp = message.getTo().iterator();

            while(mp.hasNext()) {
                t = (String)mp.next();
                addrs = new InternetAddress(t);
                addrs.validate();
                msg.addRecipient(RecipientType.TO, addrs);
            }
        }

        if(message.getCc() != null) {
            mp = message.getCc().iterator();

            while(mp.hasNext()) {
                t = (String)mp.next();
                addrs = new InternetAddress(t);
                addrs.validate();
                msg.addRecipient(RecipientType.CC, addrs);
            }
        }

        if(message.getBcc() != null) {
            mp = message.getBcc().iterator();

            while(mp.hasNext()) {
                t = (String)mp.next();
                addrs = new InternetAddress(t);
                addrs.validate();
                msg.addRecipient(RecipientType.BCC, addrs);
            }
        }

        msg.setSubject(message.getSubject());
        if(message.getAttachments() != null) {
            MimeBodyPart t1 = new MimeBodyPart();
            if(this.emailType == EmailController.EmailType.HTML_READY) {
                t1.setText(message.getBody(), "utf-8", "html");
            } else {
                t1.setText(message.getBody(), "utf-8");
            }

            MimeMultipart mp1 = new MimeMultipart();
            mp1.addBodyPart(t1);
            Iterator var7 = message.getAttachments().iterator();

            while(var7.hasNext()) {
                File file = (File)var7.next();
                MimeBodyPart mbp2 = new MimeBodyPart();
                mbp2.attachFile(file);
                mp1.addBodyPart(mbp2);
            }

            msg.setContent(mp1);
        } else if(this.emailType == EmailController.EmailType.HTML_READY) {
            msg.setText(message.getBody(), "utf-8", "html");
        } else {
            msg.setText(message.getBody(), "utf-8");
        }

        msg.setHeader("X-Mailer", "smtpsend");
        msg.setSentDate(new Date());
        SMTPTransport t2 = (SMTPTransport)this.session.getTransport("smtp");

        try {
            if(this.auth) {
                t2.connect(this.mailhost, this.user, this.password);
            } else {
                t2.connect();
            }

            t2.sendMessage(msg, msg.getAllRecipients());
        } finally {
            if(this.verbose) {
                log.debug("Email server responded:" + t2.getLastServerResponse());
            }

            t2.close();
        }

        log.debug("Email has been succesfully sent.");
    }

    public static void main(String[] args) {
        try {
            String ex = "";
            String password = "";
            String from = "";
            String to = "";
            EmailController controller = new EmailController(ex, password, "smtp.gmail.com", "587", true, true, EmailController.EmailType.PLAIN_TEXT);
            Email message = new Email(from, to, "test html", "");
            //############################ To Change ########################################
            message.addBodyFromFile(new File("c:\\Users\\m.sypa\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\DCBusinessSuite\\WEB-INF\\dinsight\\emailTemplates\\newNote.body"), new HashMap());
            controller.sendMessage(message);
        } catch (Exception var7) {
            System.out.println(var7);
        }

    }

    public static enum EmailType {
        PLAIN_TEXT,
        HTML_READY;

        private EmailType() {
        }
    }

}
