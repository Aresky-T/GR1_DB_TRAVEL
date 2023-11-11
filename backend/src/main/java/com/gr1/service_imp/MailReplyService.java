package com.gr1.service_imp;

import com.gr1.entity.Mail;
import com.gr1.entity.MailReply;
import com.gr1.repository.MailReplyRepository;
import com.gr1.service.IMailReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailReplyService implements IMailReplyService {

    @Autowired
    private MailReplyRepository mailReplyRepository;

    @Override
    public MailReply save (MailReply mailReply) {
        return mailReplyRepository.save(mailReply);
    }

    @Override
    public MailReply findById (int id) {
        return mailReplyRepository.findById(id).orElse(null);
    }

    @Override
    public MailReply findByOriginalMail (Mail mail) {
        return mailReplyRepository.findByOriginalMail(mail).orElse(null);
    }

    @Override
    public List<MailReply> findAll () {
        return mailReplyRepository.findAll();
    }
}
