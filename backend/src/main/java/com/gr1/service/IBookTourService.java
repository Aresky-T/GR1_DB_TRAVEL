package com.gr1.service;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;
import com.gr1.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookTourService {
    List<BookedTour> findAllByUser(String username);
    List<BookedTour> findAll();
    Page<BookedTour> findAll(Pageable pageable);
    BookedTour findById (int id);
    BookedTour findByTourAndAccount (int tourId, String username);
    BookedTour create (BookTourRequest request, Account account);
    void changeStatusBookedTour(BookedTour bookedTour, EBookedTour status);
    Boolean isBookedTourByUser(Account account, Tour tour);
    void save(BookedTour entity);
}
