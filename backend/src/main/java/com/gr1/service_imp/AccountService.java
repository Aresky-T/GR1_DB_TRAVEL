package com.gr1.service_imp;

import com.gr1.entity.Account;
import com.gr1.repository.AccountRepository;
import com.gr1.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account findById (int id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public Account findByUsername (String username) {
        return accountRepository.findByUsername(username).get();
    }

    @Override
    public boolean existsByUsername (String username) {
        return accountRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail (String email) {
        return accountRepository.existsByEmail(email);
    }

    @Override
    public Account saveOrUpdate (Account account) {
        return accountRepository.save(account);
    }

    @Override
    public List<Account> findAllUsers () {
        return accountRepository.findAll();
    }
}
