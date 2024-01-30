package com.gr1.service_imp;

import com.gr1.entity.Account;
import com.gr1.entity.Review;
import com.gr1.entity.Tour;
import com.gr1.repository.ReviewRepository;
import com.gr1.service.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review save (Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review findByAccountAndTour (Account account, Tour tour) {
        return reviewRepository.findByAccountAndTour(account, tour).orElse(null);
    }

    @Override
    public List<Review> findAllByTour (Tour tour) {
        return reviewRepository.findAllByTourIs(tour);
    }

    @Override
    public boolean isExist(Account account, Tour tour) {
        return reviewRepository.existsByAccountAndTour(account, tour);
    }
}
