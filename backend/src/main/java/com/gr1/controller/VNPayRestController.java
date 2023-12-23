package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import com.gr1.service.IAccountService;
import com.gr1.service.IVNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@RequestMapping("/payment/vnpay")
@RestController
public class VNPayRestController {

    @Autowired
    private IVNPayService vnPayService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private BookingStorageConfig bookingStorageConfig;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/submit")
    public String paymentWithVNPay(@RequestBody BookTourRequest bookTourRequest, HttpServletRequest request, Authentication authentication){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        bookingStorageConfig.setBookingInfo(bookTourRequest);
        bookingStorageConfig.setAccount(account);
        return vnPayService.createOrder(bookTourRequest, account, baseUrl);
    }
}
