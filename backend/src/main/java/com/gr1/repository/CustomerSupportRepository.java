package com.gr1.repository;

import com.gr1.entity.Customer;
import com.gr1.entity.CustomerSupport;
import com.gr1.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerSupportRepository extends JpaRepository<CustomerSupport, Integer> {
    List<CustomerSupport> findAllByEmployee_Id(Integer employeeId);
    CustomerSupport findByCustomerIsAndEmployeeIs(Customer customer, Employee employee);
}
