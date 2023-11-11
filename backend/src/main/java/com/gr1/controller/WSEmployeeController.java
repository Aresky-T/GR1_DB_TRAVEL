package com.gr1.controller;

import com.gr1.compare.ChatBoxComparator;
import com.gr1.compare.MailBoxComparator;
import com.gr1.dtos.request.ChatForm;
import com.gr1.dtos.response.MailBoxForEmployee;
import com.gr1.dtos.response.RoomChatForEmployee;
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

import java.util.*;
import java.util.stream.Collectors;

@Controller
public class WSEmployeeController {
    @Autowired
    private IChatBoxService chatBoxService;
    @Autowired
    private IMailBoxService mailBoxService;
    @Autowired
    private IChatService chatService;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IMailService mailService;
    @Autowired
    private ICustomerService customerService;

//    @MessageMapping({
//            "/chat/send.to.employee/conversation/{id}",
//            "/chat/reload.conversation.of.employee/{id}"
//    })
//    @SendTo("/topic/employee/chat/conversation/{id}")
//    public RoomChatForEmployee sendMessageToEmployee(
//            @DestinationVariable int id,
//            @Payload(required = false) ChatForm chatForm
//    ){
//        if(Objects.nonNull(chatForm)){
//            ChatBox conversation = chatBoxService.findById(id);
//            Chat newChat = chatForm.buildChat();
//            if(Objects.nonNull(conversation)){
//                newChat.setChatBox(conversation);
//                chatService.save(newChat);
//            }
//        }
//        return chatBoxService.convertToRoomChatForEmployeeDto(chatBoxService.findById(id));
//    }
    @MessageMapping("/chat/send.to.employee/{employeeId}/{conversationId}")
    @SendTo("/topic/chat/conversations/{employeeId}")
    public List<RoomChatForEmployee> sendMessageToEmp(
            @DestinationVariable int employeeId,
            @DestinationVariable int conversationId,
            @Payload ChatForm chatForm
    ){
        Employee employee = employeeService.findById(employeeId);
        ChatBox conversation = chatBoxService.findById(conversationId);
        if(employee != null && conversation != null){
            Chat newChat = chatForm.buildChat();
            newChat.setChatBox(conversation);
            chatService.save(newChat);

            List<Chat> employeeChats = conversation.getChatList()
                    .stream().peek(c -> {
                        if(c.getSender().equals(ESender.EMPLOYEE)){
                            c.setStatus(EMessageStatus.SEEN);
                        }
                    }).collect(Collectors.toList());
            chatService.saveAll(employeeChats);

            List<ChatBox> conversations = chatBoxService.findAllByEmployee(employee);
            conversations.sort(new ChatBoxComparator());
            return conversations.stream().map(c -> chatBoxService.convertToRoomChatForEmployeeDto(c)).collect(Collectors.toList());
        }

        return new ArrayList<>();
    }

    @MessageMapping({
            "/chat/update-conversations/{employeeId}",
            "/chat/get-conversations/{employeeId}"
    })
    @SendTo("/topic/chat/conversations/{employeeId}")
    public List<RoomChatForEmployee> getConversations(@DestinationVariable int employeeId){
        Employee employee = employeeService.findById(employeeId);
        if(employee == null){
            return new ArrayList<>();
        }
        List<ChatBox> conversations = chatBoxService.findAllByEmployee(employee);
        conversations.sort(new ChatBoxComparator());
        return conversations.stream().map(c -> chatBoxService.convertToRoomChatForEmployeeDto(c)).collect(Collectors.toList());
    }

    @MessageMapping("/chat/check-status/employee/{employeeId}")
    @SendTo("/topic/chat/employee-status/{employeeId}")
    public EEmployeeStatus getStatus(@DestinationVariable int employeeId){
        Employee employee = employeeService.findById(employeeId);
        if(Objects.nonNull(employee)){
            return employee.getStatus();
        }
        return null;
    }

    @MessageMapping("/chat/update-status/employee/{employeeId}/{status}")
    @SendTo("/topic/chat/employee-status/{employeeId}")
    public EEmployeeStatus updateStatus(
       @DestinationVariable int employeeId,
       @DestinationVariable String status,
       SimpMessageHeaderAccessor headerAccessor
    ){
        EEmployeeStatus newStatus = EEmployeeStatus.valueOf(status);
        Employee employee = employeeService.findById(employeeId);
        // Get Session Attributes from HeaderAccessor
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        if (Objects.nonNull(attributes)){
            attributes.put("employeeId", employee.getId());
        }

        if(Objects.nonNull(employee) && (employee.getStatus() != newStatus)){
                employee.setStatus(newStatus);
                employeeService.save(employee);
        }
        return newStatus;
    }

    @MessageMapping("/mail/load.mailboxes.of.employee/{employeeId}")
    @SendTo("/topic/mail/employee-mailboxes/{employeeId}")
    public List<MailBoxForEmployee> loadMailBoxesOfEmployee(@DestinationVariable int employeeId){
        Employee employee = employeeService.findById(employeeId);
        List<MailBoxForEmployee> dtos = null;
        if(Objects.nonNull(employee)){
            List<MailBox> mailBoxes = mailBoxService.findAllByEmployee(employee);
            if(mailBoxes.isEmpty()){
                dtos = new ArrayList<>();
            } else {
                mailBoxes.sort(new MailBoxComparator());
                dtos = mailBoxes.stream().map(mailBox -> mailBoxService.convertToMailBoxForEmployee(mailBox)).collect(Collectors.toList());
            }
        }
        return dtos;
    }

    @MessageMapping("/mail/load.mailbox.of.employee/{mailBoxId}")
    @SendTo("/topic/mail/employee-mailbox/{mailBoxId}")
    public MailBoxForEmployee loadMailBoxOfEmployee(@DestinationVariable int mailBoxId){
        MailBox mailBox = mailBoxService.findById(mailBoxId);
        if(Objects.nonNull(mailBox)){
            return mailBoxService.convertToMailBoxForEmployee(mailBox);
        }
        return null;
    }

    @EventListener
    public void handleEmployeeDisconnectListener(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        if(Objects.nonNull(attributes)){
            Integer employeeId = (Integer) attributes.get("employeeId");
            if(employeeId != null){
                Employee employee = employeeService.findById(employeeId);
                if(Objects.nonNull(employee) && (employee.getStatus() == EEmployeeStatus.ONLINE)){
                    employee.setStatus(EEmployeeStatus.OFFLINE);
                    employeeService.save(employee);
                }
            }
        }
    }
}
