package com.gr1.service;

import com.gr1.dtos.response.RoomChatForCustomer;
import com.gr1.dtos.response.RoomChatForEmployee;
import com.gr1.entity.Account;
import com.gr1.entity.ChatBox;
import com.gr1.entity.Customer;
import com.gr1.entity.Employee;

import java.util.List;

public interface IChatBoxService {
    List<ChatBox> findAllByEmployee(Employee employee);
    ChatBox connect(String fullName, String email);
    ChatBox connect(Account account);
    ChatBox findById(int chatBoxId);
    ChatBox findByCustomerAndEmployee(Customer customer, Employee employee);
    boolean deleteById(int chatBoxId);
    RoomChatForEmployee convertToRoomChatForEmployeeDto (ChatBox chatBox);
    RoomChatForCustomer convertToRoomChatForCustomerDto (ChatBox chatBox);
}
