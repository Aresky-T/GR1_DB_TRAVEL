package com.gr1.repository;

import com.gr1.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
