package com.gr1.service;

import com.gr1.dtos.request.UpdatePasswordForm;
import com.gr1.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IAccountService {
    Account findById(int id);
    Account findByUsername(String username);
    Account findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Account saveOrUpdate(Account account);
    List<Account> findAllUsers();
    Page<Account> findAllUsers(Pageable pageable);
    void upgradeRoleToEmployee(Integer accountId);
    void lockAccount(Integer accountId);
    void activateAccount(Integer accountId);
    void deleteAccount(Integer accountId);
    void updatePassword(UpdatePasswordForm form, String username);
    void validateJwt(String jwt);
}
