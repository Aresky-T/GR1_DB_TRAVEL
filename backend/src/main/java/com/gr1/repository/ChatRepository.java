package com.gr1.repository;

import com.gr1.entity.Chat;
import com.gr1.entity.ChatBox;
import com.gr1.entity.CustomerSupport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findAllByChatBoxOrderBySentAtAsc(ChatBox chatBox);

    @Query(value = "SELECT * FROM chat WHERE chat_box = ?1 ORDER BY sent_at DESC LIMIT 1", nativeQuery = true)
    Optional<Chat> findLatestChatByChatBox(int chatBoxId);
}
