package com.gr1.entity;

public enum EFormOfPayment {
    BANK_TRANSFER("Chuyển khoản"),
    CASH_PAYMENT("Thanh toán tiền mặt"),
    VNPAY_ON_WEBSITE("Thanh toán qua VNPAY tại trang web");

    private final String value;
    private EFormOfPayment(String value){
        this.value = value;
    }
    String getValue (){
        return this.value;
    }
}
