package com.gr1.service;

import com.gr1.dtos.request.CancelBookedTourForm;
import com.gr1.entity.Account;
import com.gr1.entity.RequestCancelBookedTour;
import com.gr1.entity.Tour;

public interface IRequestService {
    void addRequestCancelBookedTour(CancelBookedTourForm form, int accountId);
    void deleteRequestCancelBookedTour(int id);
    Account getAccountById(int id);
    Tour getTourById(int id);
    RequestCancelBookedTour findById(int id);
}
