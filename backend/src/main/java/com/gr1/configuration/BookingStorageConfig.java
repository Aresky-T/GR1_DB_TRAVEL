package com.gr1.configuration;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import com.gr1.entity.Tour;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Getter
@Component
@Scope("singleton")
public class BookingStorageConfig {

    public static final String BOOKING_INFO = "BOOKING_INFO";
    public static final String ACCOUNT_INFO = "ACCOUNT_INFO";
    public static final String TOUR_INFO = "TOUR_INFO";
    public static final String BOOKED_TOUR_ID = "BOOKED_TOUR_ID";

    private final BookingStorageElement<BookTourRequest> bookingInfo = new BookingStorageElement<>(BOOKING_INFO, null);
    private final BookingStorageElement<Account> account = new BookingStorageElement<>(ACCOUNT_INFO, null);
    private final BookingStorageElement<Tour> tour = new BookingStorageElement<>(TOUR_INFO, null);
    private final BookingStorageElement<Integer> bookedTourId = new BookingStorageElement<>(BOOKED_TOUR_ID, null);

    @Getter
    @NoArgsConstructor
    public static class BookingStorageElement<T>{
        private String key;

        @Setter
        private T value;
        public BookingStorageElement(String key, T value){
            this.key = key;
            this.value = value;
        }

        public void clearValue (){
            this.value = null;
        }
    }
}
