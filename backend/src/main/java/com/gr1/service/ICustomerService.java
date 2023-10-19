package com.gr1.service;

import com.gr1.entity.Account;
import com.gr1.entity.Customer;
import com.gr1.entity.GuestCustomer;
import com.gr1.entity.RegisteredCustomer;

public interface ICustomerService {
    Customer save(Customer customer);
    boolean isExistsByEmail (String email);
    boolean isExistsByAccount (Account account);
    RegisteredCustomer findByAccount(Account account);
    GuestCustomer findByEmail (String email);
    Customer findById(int customerId);
}
