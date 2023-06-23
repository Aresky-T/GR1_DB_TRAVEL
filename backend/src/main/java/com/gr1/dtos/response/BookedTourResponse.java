package com.gr1.dtos.response;

import com.gr1.entity.BookedTourPK;
import com.gr1.entity.EGender;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class BookedTourResponse {
    private Integer id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Integer totalPersons;
    private Integer adultNumber;
    private Integer childrenNumber;
    private Integer babyNumber;
    private String note;
    private Integer totalPrice;
    private Integer tourId;
    private List<TouristListDTO> touristList;

    @Data
    @NoArgsConstructor
    public static class TouristListDTO {
        private String fullName;
        private String birthDate;
        private String gender;
    }
}
