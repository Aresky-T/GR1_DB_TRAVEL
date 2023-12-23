package com.gr1.service;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;

import javax.servlet.http.HttpServletRequest;

public interface IVNPayService {
    String createOrder(BookTourRequest bookTourRequest, Account account, String urlReturn);
    int orderReturn(HttpServletRequest request);
}
