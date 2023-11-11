package com.gr1.controller;

import com.gr1.compare.ChatBoxComparator;
import com.gr1.dtos.request.GuestCustomerForm;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.dtos.response.RoomChatForCustomer;
import com.gr1.dtos.response.RoomChatForEmployee;
import com.gr1.entity.Account;
import com.gr1.entity.ChatBox;
import com.gr1.entity.Employee;
import com.gr1.service.IAccountService;
import com.gr1.service.IChatBoxService;
import com.gr1.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private IChatBoxService chatBoxService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IEmployeeService employeeService;

    @PostMapping("/connect/guest")
    public ResponseEntity<?> connectEmployeeForGuestCustomer(@RequestBody GuestCustomerForm form) {
        ChatBox chatBox = chatBoxService.connect(form.getFullName(), form.getEmail());
        if (chatBox == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Kết nối thất bại!"));
        }
        RoomChatForCustomer dto = chatBoxService.convertToRoomChatForCustomerDto(chatBox);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/connect/registered")
    public ResponseEntity<?> connectEmployeeForRegisteredCustomer(Authentication authentication) {
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        ChatBox chatBox = chatBoxService.connect(account);
        if (chatBox == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Kết nối thất bại!"));
        }
        RoomChatForCustomer dto = chatBoxService.convertToRoomChatForCustomerDto(chatBox);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/conversations/employee/{employeeId}")
    public ResponseEntity<?> getConversations(@PathVariable int employeeId) {
        Employee employee = employeeService.findById(employeeId);
        if(employee == null){
            return ResponseEntity.ok(new MessageResponse("Invalid employeeId"));
        }
        List<ChatBox> entities = chatBoxService.findAllByEmployee(employee);
        if(entities.size() > 1){
            entities.sort(new ChatBoxComparator());
        }
        List<RoomChatForEmployee> dtos = entities.stream().map(e -> chatBoxService.convertToRoomChatForEmployeeDto(e)).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/conversations/employee")
    public ResponseEntity<?> getConversations(Authentication authentication) {
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Employee employee = employeeService.findByAccount(account);
        if(employee == null){
            return ResponseEntity.ok(new MessageResponse("Employee does not exists"));
        }
        List<ChatBox> entities = chatBoxService.findAllByEmployee(employee);
//        if(entities.size() > 1){
//            entities.sort(new ChatBoxComparator());
//        }
        entities.sort(new ChatBoxComparator());
        List<RoomChatForEmployee> dtos = entities.stream()
                .map(e -> chatBoxService.convertToRoomChatForEmployeeDto(e))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @DeleteMapping("/conversation/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable int id){
        return ResponseEntity.ok(chatBoxService.deleteById(id));
    }
}
