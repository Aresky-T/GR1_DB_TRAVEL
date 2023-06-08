package com.gr1.repository;

import com.gr1.entity.Account;

import com.gr1.entity.BookedTour;
import com.gr1.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookTourRepository extends JpaRepository<BookedTour, Integer> {

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM BookedTour AS b WHERE b.account = :account AND b.tour = :tour")
    Boolean existByAccountAndTour(@Param("account") Account account, @Param("tour") Tour tour);

    BookedTour findByAccountAndTour(Account account, Tour tour);
}
