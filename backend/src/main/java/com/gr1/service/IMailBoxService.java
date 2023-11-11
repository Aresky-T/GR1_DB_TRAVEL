package com.gr1.service;

import com.gr1.dtos.response.MailBoxForEmployee;
import com.gr1.entity.Employee;
import com.gr1.entity.MailBox;

import java.util.List;

public interface IMailBoxService {
    List<MailBox> findAllByEmployee(Employee employee);
    MailBox connect(String fullName, String email);
    MailBox findById(int mailBoxId);
    boolean deleteById(int mailBoxId);
    MailBoxForEmployee convertToMailBoxForEmployee(MailBox mailBox);
}
