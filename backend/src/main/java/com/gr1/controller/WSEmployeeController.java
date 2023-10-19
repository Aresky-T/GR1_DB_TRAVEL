package com.gr1.controller;

import com.gr1.dtos.request.ChatForm;
import com.gr1.dtos.response.RoomChatForEmployee;
import com.gr1.entity.Chat;
import com.gr1.entity.CustomerSupport;
import com.gr1.entity.EEmployeeStatus;
import com.gr1.entity.Employee;
import com.gr1.service.IChatService;
import com.gr1.service.ICustomerSupportService;
import com.gr1.service.IEmployeeService;
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

@Controller
public class WSEmployeeController {
    @Autowired
    private ICustomerSupportService csService;
    @Autowired
    private IChatService chatService;
    @Autowired
    private IEmployeeService employeeService;

    @MessageMapping("/chat/send.to.employee/room/{roomId}")
    @SendTo("/topic/employee/chat/room/{roomId}")
    public RoomChatForEmployee sendMessageToEmployee(
            @DestinationVariable int roomId,
            @Payload ChatForm chatForm
    ){
        Chat newChat = chatForm.buildChat();
        CustomerSupport room = csService.findById(roomId);
        if(Objects.nonNull(room)){
            newChat.setRoom(room);
            chatService.save(newChat);
            return csService.convertToDto(csService.findById(roomId));
        }
        return null;
    }

    @MessageMapping({
            "/chat/update-conversations/{employeeId}",
            "/chat/get-conversations/{employeeId}"
    })
    @SendTo("/topic/chat/conversations/{employeeId}")
    public List<RoomChatForEmployee> getConversations(@DestinationVariable int employeeId){
        List<CustomerSupport> conversations = csService.getRoomsByEmployeeId(employeeId);
        return csService.convertToDtos(conversations);
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
