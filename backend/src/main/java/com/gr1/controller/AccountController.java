package com.gr1.controller;

import com.gr1.dtos.request.UpdatePasswordForm;
import com.gr1.dtos.response.AccountResponse;
import com.gr1.email.IEmailService;
import com.gr1.entity.Account;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.gr1.service.IAccountService;

import javax.mail.MessagingException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/account")
public class AccountController {
    
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IEmailService emailService;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllAccounts(Pageable pageable){
        Page<Account> entities = accountService.findAllUsers(pageable);
        Page<AccountResponse> dtos = entities.map(a -> modelMapper.map(a, AccountResponse.class));
        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/upgrade-to-employee")
    public ResponseEntity<?> upgradeRoleToEmployee(@RequestParam(name = "account_id") Integer accountId){
        accountService.upgradeRoleToEmployee(accountId);
        return ResponseEntity.ok("upgrade role success");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/lock-account/{id}")
    public ResponseEntity<?> lockAccount(@PathVariable Integer id){
        accountService.lockAccount(id);
        return ResponseEntity.ok("lock account success");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/activate-account/{id}")
    public ResponseEntity<?> activeAccount(@PathVariable Integer id){
        accountService.activateAccount(id);
        return ResponseEntity.ok("lock account success");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id){
        accountService.deleteAccount(id);
        return ResponseEntity.ok("delete success");
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER', 'EMPLOYEE')")
    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordForm form, Authentication authentication){
        String username = authentication.getName();
        accountService.updatePassword(form, username);
        return ResponseEntity.ok("update password success");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) throws MessagingException {
        emailService.sendForgotPasswordEmail(email);
        return ResponseEntity.ok("success");
    }

}
