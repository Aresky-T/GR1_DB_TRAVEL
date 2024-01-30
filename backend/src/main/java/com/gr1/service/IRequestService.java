package com.gr1.service;

import com.gr1.dtos.request.CancelBookedTourForm;
import com.gr1.entity.Account;
import com.gr1.entity.RequestCancelBookedTour;
import com.gr1.entity.Tour;

public interface IRequestService {
    void addRequestCancelBookedTour(CancelBookedTourForm form, Account account);
    void deleteRequestCancelBookedTour(int id);
    RequestCancelBookedTour findById(int id);
}
