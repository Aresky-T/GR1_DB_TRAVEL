package com.gr1.configuration;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import lombok.Getter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Getter
@Component
@Scope("singleton")
public class BookingStorageConfig {
    private BookTourRequest bookingInfo;
    private Account account;

    public void setBookingInfo(BookTourRequest data){
        this.bookingInfo = data;
    }

    public void setAccount(Account account){
        this.account = account;
    }
}
