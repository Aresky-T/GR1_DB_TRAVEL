package com.gr1.repository;

import com.gr1.entity.ChatBox;
import com.gr1.entity.Customer;
import com.gr1.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatBoxRepository extends JpaRepository<ChatBox, Integer> {
    List<ChatBox> findAllByEmployeeIs(Employee employee);
    Optional<ChatBox> findByCustomerIsAndEmployeeIs(Customer customer, Employee employee);
    Boolean existsByCustomerIsAndEmployeeIs(Customer customer, Employee employee);
}
