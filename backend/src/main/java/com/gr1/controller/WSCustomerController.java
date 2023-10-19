package com.gr1.controller;

import com.gr1.dtos.request.ChatForm;
import com.gr1.dtos.response.RoomChatForCustomer;
import com.gr1.entity.Chat;
import com.gr1.entity.Customer;
import com.gr1.entity.CustomerSupport;
import com.gr1.entity.ECustomerStatus;
import com.gr1.service.IChatService;
import com.gr1.service.ICustomerService;
import com.gr1.service.ICustomerSupportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
public class WSCustomerController {

    @Autowired
    private ICustomerSupportService csService;
    @Autowired
    private IChatService chatService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private ModelMapper modelMapper;

    @MessageMapping("/chat/send.to.customer/room/{roomId}")
    @SendTo("/topic/customer/chat/room/{roomId}")
    public RoomChatForCustomer sendMessageToCustomer(
            @DestinationVariable int roomId,
            @Payload ChatForm chatForm
    ){
        Chat newChat = chatForm.buildChat();
        CustomerSupport room = csService.findById(roomId);
        if(Objects.nonNull(room)){
            newChat.setRoom(room);
            chatService.save(newChat);
            return modelMapper.map(
                    csService.findById(roomId),
                    RoomChatForCustomer.class
            );
        }
        return null;
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
            @DestinationVariable String status
    ){
        Customer customer = customerService.findById(customerId);
        if(Objects.nonNull(customer)){
            customer.setStatus(ECustomerStatus.valueOf(status));
            customerService.save(customer);
            return customerService.save(customer).getStatus();
        }
        return null;
    }

}
