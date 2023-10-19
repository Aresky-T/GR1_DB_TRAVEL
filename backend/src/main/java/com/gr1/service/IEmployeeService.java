package com.gr1.service;

import com.gr1.entity.Account;
import com.gr1.entity.EEmployeeStatus;
import com.gr1.entity.Employee;

public interface IEmployeeService {
    boolean existsOnlineEmployee();
    Employee save(Employee employee);
    Employee findById(int id);
    Employee findByStatus(EEmployeeStatus status);
    Employee findByAccount(Account account);
}
