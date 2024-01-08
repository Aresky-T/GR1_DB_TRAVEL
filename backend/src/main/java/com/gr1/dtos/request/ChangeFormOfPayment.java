package com.gr1.dtos.request;

import com.gr1.entity.EFormOfPayment;
import lombok.Data;

@Data
public class ChangeFormOfPayment {
    private int bookedTourId;
    private EFormOfPayment formOfPayment;
}
