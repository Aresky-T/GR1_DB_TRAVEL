package com.gr1.security;

import com.gr1.entity.Account;
import com.gr1.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException {
        Optional<Account> optional = accountRepository.findByUsername(username);
        if (optional.isEmpty()){
            throw new UsernameNotFoundException("Không tìm thấy tài khoản có tên đăng nhập là: " + username);
        }
        Account account = optional.get();
        return CustomUserDetails.buildUserDetails(account);
    }
}
