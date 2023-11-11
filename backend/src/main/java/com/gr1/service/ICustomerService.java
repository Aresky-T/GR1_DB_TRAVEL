package com.gr1.service;

import com.gr1.entity.Account;
import com.gr1.entity.Customer;

public interface ICustomerService {
    Customer save(Customer customer);
    boolean isExistsByEmail (String email);
    boolean isExistsByAccount (Account account);
    Customer findById(int customerId);
    Customer findByEmail(String email);
    Customer findByAccount(Account account);
}
