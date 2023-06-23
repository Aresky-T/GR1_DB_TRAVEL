package com.gr1.email;

import java.util.Date;

public interface IEmailService {
    void sendEmail(String recipient, String subject, String text);
    void sendForgotPasswordEmail(String email);
    void sendEmailToAcceptAnRequestFromUser(String email, Date requestTime);
}
