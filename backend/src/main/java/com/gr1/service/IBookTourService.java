package com.gr1.service;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.dtos.request.BookedTourUpdate;
import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookTourService {
    List<BookedTour> findAllByUser(String username);
    List<BookedTour> findAll();
    Page<BookedTour> findAll(Pageable pageable);
    BookedTour findById (int id);
    BookedTour findByTourAndAccount (int tourId, String username);
    void create (BookTourRequest request, String username);
    void changeStatusBookedTour(BookedTour bookedTour, EBookedTour status);
}
