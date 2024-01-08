package com.gr1.service;

import javax.servlet.http.HttpServletRequest;

public interface IVNPayService {
    String createOrder(int amount, String content, String urlReturn);
    int orderReturn(HttpServletRequest request);
}
