package com.gr1.repository;

import com.gr1.entity.Account;
import com.gr1.entity.RegisteredCustomer;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisteredCustomerRepository extends CustomerRepository<RegisteredCustomer> {
    boolean existsByAccountIs(Account account);
    Optional<RegisteredCustomer> findByAccount(Account account);
}
