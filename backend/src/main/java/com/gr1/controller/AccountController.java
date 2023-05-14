package com.gr1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gr1.service.IAccountService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/account")
public class AccountController {
    
    @Autowired
    private IAccountService accountService;
}
