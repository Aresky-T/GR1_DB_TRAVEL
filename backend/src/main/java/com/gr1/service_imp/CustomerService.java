package com.gr1.service_imp;

import com.gr1.entity.*;
import com.gr1.repository.CustomerRepository;
import com.gr1.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    @Override
    public Customer save (Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public boolean isExistsByEmail (String email) {
        return customerRepository.existsByEmail(email);
    }

    @Override
    public boolean isExistsByAccount (Account account) {
        return customerRepository.existsByAccount(account);
    }

    @Override
    public Customer findById (int customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }

    @Override
    public Customer findByEmail (String email) {
        return customerRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Customer findByAccount (Account account) {
        return customerRepository.findByAccount(account).orElse(null);
    }
}
