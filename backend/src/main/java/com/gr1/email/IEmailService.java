package com.gr1.email;

import javax.mail.MessagingException;
import java.util.Date;

public interface IEmailService {
    void sendEmail(String recipient, String subject, String text);
    void sendForgotPasswordEmail(String email) throws MessagingException;
    void sendEmailToAcceptAnRequestFromUser(String email, Date requestTime);
}
