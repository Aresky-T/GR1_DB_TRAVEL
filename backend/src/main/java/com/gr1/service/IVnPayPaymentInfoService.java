package com.gr1.service;

import com.gr1.entity.VnPayPaymentInfo;

import java.util.List;

public interface IVnPayPaymentInfoService {
    void save(VnPayPaymentInfo entity);
    List<VnPayPaymentInfo> findAll();
}
