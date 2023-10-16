package com.gr1.entity;

import lombok.Getter;

@Getter
public enum EBookedTour {
    NOT_PAY("Chưa thanh toán"),
    PAY_UP("Đã thanh toán"),
    REJECTED("Bị từ chối");

    private final String status;

    private EBookedTour(String status){
        this.status = status;
    }

}
