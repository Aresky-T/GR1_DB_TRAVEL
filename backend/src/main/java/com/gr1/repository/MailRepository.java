package com.gr1.repository;

import com.gr1.entity.Mail;

import java.util.List;
import java.util.Optional;

import com.gr1.entity.MailBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {
    List<Mail> findAllByMailBoxOrderBySentAtDesc(MailBox mailBox);
    @Query(value = "SELECT * FROM mail WHERE mail_box = ?1 ORDER BY sent_at DESC LIMIT 1", nativeQuery = true)
    Optional<Mail> findLatestMailByMailBox(int mailBoxId);
}
