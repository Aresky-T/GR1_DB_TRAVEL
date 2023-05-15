package com.gr1.email;

public interface IEmailService {
    void sendEmail(String recipient, String subject, String text);
    void sendForgotPasswordEmail(String email);
}
