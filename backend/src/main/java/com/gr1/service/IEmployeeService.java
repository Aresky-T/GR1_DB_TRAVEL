package com.gr1.service;

import com.gr1.entity.Account;
import com.gr1.entity.Employee;

public interface IEmployeeService {
    Employee save(Employee employee);
    Employee findById(int id);
    Employee findByAccount(Account account);
}
