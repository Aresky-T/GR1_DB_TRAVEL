package com.gr1.repository;

import com.gr1.entity.VnPayPaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VnPayPaymentInfoRepository extends JpaRepository<VnPayPaymentInfo, Integer> {
}
