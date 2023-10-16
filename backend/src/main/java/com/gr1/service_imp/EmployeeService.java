package com.gr1.service_imp;

import com.gr1.entity.Account;
import com.gr1.entity.Employee;
import com.gr1.repository.EmployeeRepository;
import com.gr1.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee save (Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee findById (int id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee findByAccount (Account account) {
        return employeeRepository.findByAccount(account).orElse(null);
    }
}
