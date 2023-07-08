package com.gr1.entity;

public enum ETourStatus {
    NOT_STARTED("Chưa diễn ra"),
    ON_GOING("Đang diễn ra"),
    FINISHED("Đã hoàn thành"),
    CANCELED("Đã hủy");

    private final String status;

    private ETourStatus(String status){
        this.status = status;
    }

    public String getStatus(){
        return status;
    }
}
