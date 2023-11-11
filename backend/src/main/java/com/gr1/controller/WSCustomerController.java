package com.gr1.controller;

import com.gr1.dtos.request.ChatForm;
import com.gr1.dtos.response.RoomChatForCustomer;
import com.gr1.entity.*;
import com.gr1.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Controller
public class WSCustomerController {

    @Autowired
    private IChatBoxService chatBoxService;
    @Autowired
    private IMailBoxService mailBoxService;
    @Autowired
    private IChatService chatService;
    @Autowired
    private IMailService mailService;
    @Autowired
    private ICustomerService customerService;

    @MessageMapping({
            "/chat/send.to.customer/conversation/{id}",
            "/chat/refresh.conversation.for.customer/{id}"
    })
    @SendTo("/topic/customer/chat/conversation/{id}")
    public RoomChatForCustomer sendMessageToCustomer(
            @DestinationVariable int id,
            @Payload(required = false) ChatForm chatForm
    ){
        if(Objects.nonNull(chatForm)){
            ChatBox conversation = chatBoxService.findById(id);
            if(Objects.nonNull(conversation)){
                Chat newChat = chatForm.buildChat();
                newChat.setChatBox(conversation);
                chatService.save(newChat);

                // update status of message to "seen"
                List<Chat> customerChats = conversation.getChatList().stream().peek(c -> {
                    if(c.getSender().equals(ESender.CUSTOMER)){
                        c.setStatus(EMessageStatus.SEEN);
                    }
                }).collect(Collectors.toList());
                chatService.saveAll(customerChats);
            }
        }
        return chatBoxService.convertToRoomChatForCustomerDto(chatBoxService.findById(id));
    }

    @MessageMapping("/chat/check-status/customer/{customerId}")
    @SendTo("/topic/chat/customer-status/{customerId}")
    public ECustomerStatus getStatus(@DestinationVariable int customerId){
        Customer customer = customerService.findById(customerId);
        if(Objects.nonNull(customer)){
            return customer.getStatus();
        }
        return null;
    }

    @MessageMapping("/chat/update-status/customer/{customerId}/{status}")
    @SendTo("/topic/chat/customer-status/{customerId}")
    public ECustomerStatus updateStatus(
            @DestinationVariable int customerId,
            @DestinationVariable String status,
            SimpMessageHeaderAccessor headerAccessor
    ){
        Customer customer = customerService.findById(customerId);
        // Get Session Attributes from HeaderAccessor
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        if(customer == null){
            return null;
        }
        if (Objects.nonNull(attributes)){
            attributes.put("customerId", customerId);
        }
        customer.setStatus(ECustomerStatus.valueOf(status));
        customerService.save(customer);
        return customerService.save(customer).getStatus();
    }

    @EventListener
    public void handleCustomerDisconnectEvent(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        if(Objects.nonNull(attributes)){
            Integer customerId = (Integer) attributes.get("customerId");
            if(Objects.nonNull(customerId)){
                Customer customer = customerService.findById(customerId);
                if(Objects.nonNull(customer) && customer.getStatus() == ECustomerStatus.ONLINE){
                    customer.setStatus(ECustomerStatus.OFFLINE);
                    customerService.save(customer);
                }
            }
        }
    }
}
