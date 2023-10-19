package com.gr1.controller;

import com.gr1.dtos.request.GuestCustomerForm;
import com.gr1.dtos.response.*;
import com.gr1.entity.*;
import com.gr1.service.IAccountService;
import com.gr1.service.ICustomerSupportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/customer-support")
public class CustomerSupportController {
    @Autowired
    private ICustomerSupportService csService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/connect/guest")
    public ResponseEntity<?> connectEmployeeForGuestCustomer(@RequestBody GuestCustomerForm form){
        GuestCustomer customer = form.buildGuestCustomer();
        CustomerSupport room = csService.connect(customer);
        if(room == null){
            return ResponseEntity.ok( new MessageResponse("Kết nối thất bại!"));
        }
        RoomChatForCustomer dto = modelMapper.map(room, RoomChatForCustomer.class);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/connect/registered/")
    public ResponseEntity<?> connectEmployeeForRegisteredCustomer(Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        CustomerSupport room = csService.connect(account);
        if(room == null){
            return ResponseEntity.ok( new MessageResponse("Kết nối thất bại!"));
        }
        RoomChatForCustomer dto = modelMapper.map(room, RoomChatForCustomer.class);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getConversations(@PathVariable int employeeId){
        List<CustomerSupport> entities = csService.getRoomsByEmployeeId(employeeId);
        List<RoomChatForEmployee> dtos = csService.convertToDtos(entities);
        return ResponseEntity.ok(dtos);
    }
}
