package com.gr1.repository;

import com.gr1.entity.GuestCustomer;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuestCustomerRepository extends CustomerRepository<GuestCustomer> {
    boolean existsByEmailIs(String email);
    Optional<GuestCustomer> findByEmailIs(String email);
}
