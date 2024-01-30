package com.gr1.repository;

import com.gr1.entity.Account;
import com.gr1.entity.Review;
import com.gr1.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByTourIs (Tour tour);
    Optional<Review> findByAccountAndTour(Account account, Tour tour);
    boolean existsByAccountAndTour(Account account, Tour tour);
}
