package com.gr1.service_imp;

import com.gr1.entity.VnPayPaymentInfo;
import com.gr1.repository.VnPayPaymentInfoRepository;
import com.gr1.service.IVnPayPaymentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VnPayPaymentInfoService implements IVnPayPaymentInfoService {

    @Autowired
    private VnPayPaymentInfoRepository vnPayPaymentInfoRepository;

    @Override
    public void save(VnPayPaymentInfo entity) {
        vnPayPaymentInfoRepository.save(entity);
    }

    @Override
    public List<VnPayPaymentInfo> findAll() {
        return vnPayPaymentInfoRepository.findAll();
    }
}
