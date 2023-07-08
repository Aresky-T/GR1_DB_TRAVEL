package com.gr1.dtos.request;

import com.gr1.entity.EBookedTour;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookedTourUpdate {
    private Integer id;
    private Integer adultNumber;
    private Integer childrenNumber;
    private Integer babyNumber;
    private EBookedTour status;
}
