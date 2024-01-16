package com.gr1.dtos.request;

import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class BookTourRequest {
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Integer adultNumber;
    private Integer childrenNumber;
    private Integer babyNumber;
    private String note;
    private Integer tourId;
    private Integer totalPrice;
    private List<TouristListRequest> touristList;

    public BookedTour buildEntity (){
        BookedTour entity = new BookedTour();
        int totalPersons = adultNumber + childrenNumber + babyNumber;
        entity.setFullName(fullName);
        entity.setEmail(email);
        entity.setPhone(phone);
        entity.setAddress(address);
        entity.setAdultNumber(adultNumber);
        entity.setChildrenNumber(childrenNumber);
        entity.setBabyNumber(babyNumber);
        entity.setTotalPersons(totalPersons);
        entity.setNote(note);
        entity.setTotalPrice(totalPrice);
        entity.setStatus(EBookedTour.NOT_PAY);
        return entity;
    }

    @Override
    public String toString() {
        return "BookingInfo: [name: \"" + fullName + "\", email: \"" + email + "\", phone: \"" + phone
                + "\", address: \"" + address + "\", tourId: \"" + tourId + "\", totalPrice: \n" + totalPrice + "\"";
    }
}
