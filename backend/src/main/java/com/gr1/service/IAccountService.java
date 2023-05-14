package com.gr1.service;

import com.gr1.entity.Account;

import java.util.List;

public interface IAccountService {
    Account findById(int id);
    Account findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Account saveOrUpdate(Account account);
    List<Account> findAllUsers();
}
