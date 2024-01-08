package com.gr1.dtos.request;

import com.gr1.entity.EBookedTour;
import com.gr1.entity.EFormOfPayment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeStatusBookedTour {
    private Integer bookedTourId;
    private EBookedTour status;
    private EFormOfPayment formOfPayment;
}
