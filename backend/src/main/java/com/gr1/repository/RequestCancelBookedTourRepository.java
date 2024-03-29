package com.gr1.repository;

import com.gr1.entity.Account;
import com.gr1.entity.BookedTour;
import com.gr1.entity.RequestCancelBookedTour;
import com.gr1.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestCancelBookedTourRepository extends JpaRepository<RequestCancelBookedTour, Integer> {

    @Query("SELECT CASE WHEN COUNT (r) > 0 THEN true ELSE false END FROM RequestCancelBookedTour r WHERE r.bookedTour = ?1")
    Boolean existsByBookedTour(BookedTour bookedTour);
}
