package com.gr1.dtos.request;

import com.gr1.entity.EGender;
import com.gr1.entity.TouristList;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class TouristListRequest {
    private String fullName;
    private Date birthDate;
    private EGender gender;

    public TouristList buildEntity () {
        return new TouristList(fullName, birthDate, gender);
    }
}
