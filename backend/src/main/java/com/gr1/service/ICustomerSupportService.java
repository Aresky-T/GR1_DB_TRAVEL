package com.gr1.service;

import com.gr1.entity.Customer;
import com.gr1.entity.CustomerSupport;

import java.util.List;

public interface ICustomerSupportService {
    CustomerSupport connect(Customer customer);
    void deleteById(int customerSupportId);
    CustomerSupport findById(int customerSupportId);
    List<CustomerSupport> getRoomsByEmployeeId (int employeeId);
}
