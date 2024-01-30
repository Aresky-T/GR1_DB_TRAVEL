package com.gr1.service;

import com.gr1.entity.Account;
import com.gr1.entity.Review;
import com.gr1.entity.Tour;

import java.util.List;

public interface IReviewService {
    Review save(Review review);
    Review findByAccountAndTour(Account account, Tour tour);
    List<Review> findAllByTour(Tour tour);
    boolean isExist(Account account, Tour tour);
}
