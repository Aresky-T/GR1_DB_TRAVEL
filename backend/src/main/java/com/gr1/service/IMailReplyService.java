package com.gr1.service;

import com.gr1.entity.Mail;
import com.gr1.entity.MailReply;

import java.util.List;

public interface IMailReplyService {
    MailReply save(MailReply mailReply);
    MailReply findById(int id);
    MailReply findByOriginalMail(Mail mail);
    List<MailReply> findAll();
}
