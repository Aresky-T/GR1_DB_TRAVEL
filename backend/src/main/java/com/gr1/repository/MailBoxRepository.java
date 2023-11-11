package com.gr1.repository;

import com.gr1.entity.Customer;
import com.gr1.entity.Employee;
import com.gr1.entity.MailBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailBoxRepository extends JpaRepository<MailBox, Integer> {
    List<MailBox> findAllByEmployeeIs(Employee employee);
    List<MailBox> findAllByCustomerIs(Customer customer);
    MailBox findByCustomerIsAndEmployeeIs(Customer customer, Employee employee);
    Boolean existsByCustomerIsAndEmployeeIs(Customer customer, Employee employee);
}
