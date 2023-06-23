package com.gr1.entity;

public enum EBookedTour {
    WAITING("Chờ xác nhận"),
    NOT_STARTED("Chưa diễn ra"),
    ON_GOING("Đang diễn ra"),
    FINISHED("Đã hoàn thành"),
    CANCELLED("Đã hủy");

    private final String status;

    private EBookedTour(String status){
        this.status = status;
    }

    public String getStatus(){
        return status;
    }
}
