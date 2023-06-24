package com.gr1.controller;

import com.gr1.dtos.request.UpdatePasswordForm;
import com.gr1.dtos.response.AccountResponse;
import com.gr1.email.IEmailService;
import com.gr1.entity.Account;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.gr1.service.IAccountService;

import javax.mail.MessagingException;
import java.util.List;

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

    @GetMapping("/get-all-accounts")
    public ResponseEntity<?> getAllAccounts(){
        List<Account> result = accountService.findAllUsers();
        List<AccountResponse> responses = modelMapper.map(result, new TypeToken<List<AccountResponse>>(){}.getType());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PutMapping("/upgrade-to-admin")
    public ResponseEntity<?> upgradeRole(@RequestParam(name = "account_id") Integer accountId){
        accountService.upgradeRole(accountId);
        return ResponseEntity.ok("upgrade role success");
    }

    @PutMapping("/lock-account")
    public ResponseEntity<?> lockAccount(@RequestParam(name = "account_id") Integer accountId){
        accountService.lockAccount(accountId);
        return ResponseEntity.ok("lock account success");
    }

    @PutMapping("/activate-account")
    public ResponseEntity<?> activeAccount(@RequestParam(name = "account_id") Integer accountId){
        accountService.activateAccount(accountId);
        return ResponseEntity.ok("lock account success");
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAccount(@RequestParam(name = "account_id") Integer accountId){
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok("delete success");
    }

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
