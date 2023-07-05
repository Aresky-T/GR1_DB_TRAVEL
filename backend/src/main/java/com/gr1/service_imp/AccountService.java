package com.gr1.service_imp;

import com.gr1.dtos.request.UpdatePasswordForm;
import com.gr1.entity.Account;
import com.gr1.entity.ERole;
import com.gr1.entity.EStatus;
import com.gr1.exception.AccountException;
import com.gr1.jwt.JwtUtil;
import com.gr1.repository.AccountRepository;
import com.gr1.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Account findById (int id) {
        Optional<Account> optional = accountRepository.findById(id);
        if (optional.isEmpty()){
            throw new AccountException("Invalid account_id");
        }
        return optional.get();
    }

    @Override
    public Account findByUsername (String username) {
        Optional<Account> optional = accountRepository.findByUsername(username);
        if (optional.isEmpty()){
            throw new AccountException("Invalid account");
        }
        return optional.get();
    }

    @Override
    public Account findByEmail (String email) {
        Optional<Account> optional = accountRepository.findByEmail(email);
        if (optional.isEmpty()){
            throw new AccountException("Invalid email");
        }
        return optional.get();
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

    @Override
    public Page<Account> findAllUsers(Pageable pageable) {
        return accountRepository.findAll(pageable);
    }

    @Override
    public void upgradeRole (Integer accountId) {
        Optional<Account> optional = accountRepository.findById(accountId);
        if (optional.isPresent()) {
            Account account = optional.get();
            if (account.getRole() == ERole.ADMIN){
                throw new AccountException("This account is already an admin");
            }
            account.setRole(ERole.ADMIN);
            accountRepository.save(account);
        } else {
            throw new AccountException("Invalid account");
        }
    }

    @Override
    public void lockAccount (Integer accountId) {
        Account account = findById(accountId);
        if(account.getStatus() == EStatus.BLOCKED){
            throw new AccountException("This account is already locked");
        }
        if (account.getRole() == ERole.ADMIN){
            throw new AccountException("Cannot lock admin account");
        }
        account.setStatus(EStatus.BLOCKED);
        accountRepository.save(account);
    }

    @Transactional
    @Override
    public void activateAccount (Integer accountId) {
        Account account = findById(accountId);
        if(account.getStatus() == EStatus.ACTIVE){
            throw new AccountException("This account is already locked");
        }
        if (account.getRole() == ERole.ADMIN){
            throw new AccountException("Cannot lock admin account");
        }
        account.setStatus(EStatus.ACTIVE);
        accountRepository.save(account);
    }

    @Transactional
    @Override
    public void deleteAccount (Integer accountId) {
        Account account = findById(accountId);
        if(account.getRole() == ERole.ADMIN){
            throw new AccountException("Cannot delete admin account");
        }
        accountRepository.delete(account);
    }

    @Override
    public void updatePassword (UpdatePasswordForm form, String username) {
        Account account = findByUsername(username);
        String newPassword = form.getNewPassword();
        String confirmPassword = form.getConfirmPassword();
        if (!passwordEncoder.matches(form.getCurrentPassword(), account.getPassword())){
            throw new AccountException("Invalid current password");
        }
        if(!Objects.equals(newPassword, confirmPassword)){
            throw new AccountException("New password does not match confirm password");
        }
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
    }

    @Override
    public void validateJwt (String jwt) {
        if (!jwtUtil.validateToken(jwt)){
            throw new AccountException("Invalid");
        }
    }
}
