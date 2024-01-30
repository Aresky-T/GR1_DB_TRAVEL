package com.gr1.repository;

import com.gr1.entity.Account;

import com.gr1.entity.BookedTour;
import com.gr1.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookTourRepository extends JpaRepository<BookedTour, Integer> {

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM BookedTour AS b WHERE b.account = :account AND b.tour = :tour")
    Boolean existByAccountAndTour(@Param("account") Account account, @Param("tour") Tour tour);

    List<BookedTour> findAllByAccount (Account account);

    @Query("SELECT B FROM BookedTour B WHERE B.tour = ?1 AND B.account = ?2")
    Optional<BookedTour> findByTourAndAccount (Tour tour, Account account);

    boolean existsByAccountAndTour(Account account, Tour tour);
}
