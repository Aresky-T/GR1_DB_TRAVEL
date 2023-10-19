package com.gr1.service_imp;

import com.gr1.entity.*;
import com.gr1.repository.GuestCustomerRepository;
import com.gr1.repository.RegisteredCustomerRepository;
import com.gr1.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private GuestCustomerRepository guestCusRepo;
    @Autowired
    private RegisteredCustomerRepository registeredCusRepo;

    @Transactional
    @Override
    public Customer save (Customer customer) {
        ECustomerType type = customer.getType();
        if(type == ECustomerType.GUEST){
            return guestCusRepo.save((GuestCustomer) customer);
        }
        return registeredCusRepo.save((RegisteredCustomer) customer);
    }

    @Override
    public boolean isExistsByEmail (String email) {
        return guestCusRepo.existsByEmailIs(email);
    }

    @Override
    public boolean isExistsByAccount (Account account) {
        return registeredCusRepo.existsByAccountIs(account);
    }

    @Override
    public RegisteredCustomer findByAccount (Account account) {
        return registeredCusRepo.findByAccount(account).orElse(null);
    }

    @Override
    public GuestCustomer findByEmail (String email) {
        return guestCusRepo.findByEmailIs(email).orElse(null);
    }

    @Override
    public Customer findById (int customerId) {
        return null;
    }
}
