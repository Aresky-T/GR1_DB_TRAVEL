package com.gr1.repository;

import com.gr1.entity.Chat;
import com.gr1.entity.CustomerSupport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findAllByRoomIs(CustomerSupport room);
}
