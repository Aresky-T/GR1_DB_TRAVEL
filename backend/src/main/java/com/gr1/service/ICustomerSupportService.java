package com.gr1.service;

import com.gr1.dtos.response.RoomChatForEmployee;
import com.gr1.entity.*;

import java.util.List;

public interface ICustomerSupportService {
    CustomerSupport connect(GuestCustomer customer);
    CustomerSupport connect(Account account);
    void deleteById(int customerSupportId);
    CustomerSupport findById(int customerSupportId);
    RoomChatForEmployee convertToDto(CustomerSupport entity);
    List<CustomerSupport> getRoomsByEmployeeId (int employeeId);
    List<RoomChatForEmployee> convertToDtos (List<CustomerSupport> entities);
}
