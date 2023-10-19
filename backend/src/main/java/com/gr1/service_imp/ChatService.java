package com.gr1.service_imp;

import com.gr1.entity.Chat;
import com.gr1.entity.CustomerSupport;
import com.gr1.repository.ChatRepository;
import com.gr1.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ChatService implements IChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Transactional
    @Override
    public Chat save (Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public List<Chat> findAllByRoom (CustomerSupport room) {
        return chatRepository.findAllByRoomIs(room);
    }
}
