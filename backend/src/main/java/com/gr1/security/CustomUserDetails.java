package com.gr1.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gr1.entity.Account;
import com.gr1.entity.EStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

    private int id;
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private EStatus status;
    private Collection<? extends GrantedAuthority> authorities;

    public static CustomUserDetails buildUserDetails(Account account){
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(account.getRole().toString()));

        return new CustomUserDetails(
                account.getId(),
                account.getUsername(),
                account.getPassword(),
                account.getEmail(),
                account.getStatus(),
                grantedAuthorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities () {
        return this.authorities;
    }

    @Override
    public String getPassword () {
        return this.password;
    }

    @Override
    public String getUsername () {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired () {
        return true;
    }

    @Override
    public boolean isAccountNonLocked () {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired () {
        return true;
    }

    @Override
    public boolean isEnabled () {
        return true;
    }
}
