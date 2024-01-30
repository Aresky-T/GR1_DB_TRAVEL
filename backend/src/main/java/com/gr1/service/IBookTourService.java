package com.gr1.service;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookTourService {
    List<BookedTour> findAllByUser(String username);
    List<BookedTour> findAll();
    Page<BookedTour> findAll(Pageable pageable);
    BookedTour findById (int id);
    BookedTour findByTourAndAccount (int tourId, String username);
    BookedTour findByTourAndAccount (Tour tour, Account account);
    BookedTour create (BookTourRequest request, Account account);
    void changeStatusBookedTour(BookedTour bookedTour, EBookedTour status, EFormOfPayment formOfPayment);
    Boolean isBookedTourByUser(Account account, Tour tour);
    Boolean existById(int id);
    BookedTour save(BookedTour entity);
    boolean existByAccountAndTour(Account account, Tour tour);
}
