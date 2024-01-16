package com.gr1.service;

import com.gr1.configuration.BookingStorageConfig;

import javax.servlet.http.HttpServletRequest;

public interface IVNPayService {
    int orderReturn(HttpServletRequest request);
    String createOrder(BookingStorageConfig.Element element, HttpServletRequest request);
}
