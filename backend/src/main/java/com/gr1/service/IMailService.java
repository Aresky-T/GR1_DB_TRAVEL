package com.gr1.service;

import java.util.Date;
import java.util.List;

import com.gr1.entity.CustomerSupport;
import com.gr1.entity.Mail;
import com.gr1.entity.MailBox;

import javax.mail.MessagingException;

public interface IMailService {
    Mail save(Mail mail);
    Mail findById(int id);
    boolean deleteById(int id);
    List<Mail> findAllByMailBox(MailBox mailBox);
    void sendEmail(String recipient, String subject, String text);
    void sendEmailWithHtmlTemplate(String recipient, String subject, String template);
    void sendForgotPasswordEmail(String recipient) throws MessagingException;
    void sendEmailToAcceptAnRequestFromUser(String email, Date requestTime);
}
