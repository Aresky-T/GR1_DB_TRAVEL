package com.gr1.repository;

import com.gr1.entity.Account;
import com.gr1.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByAccount(Account account);
    Optional<Customer> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByAccount(Account account);
}
