package com.gr1.service;

import com.gr1.entity.Customer;

public interface ICustomerService {
    Customer save(Customer customer);
    boolean isCustomerExistByEmail (String email);
    Customer findByEmail (String email);
    Customer findById(int customerId);
}
