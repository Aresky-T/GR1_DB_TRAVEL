package com.gr1.repository;

import com.gr1.entity.Mail;
import com.gr1.entity.MailReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MailReplyRepository extends JpaRepository<MailReply, Integer> {
    Optional<MailReply> findByOriginalMail(Mail originalMail);
}
