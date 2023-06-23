package com.gr1.service;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;

import java.util.List;

public interface IBookTourService {
    List<BookedTour> findAllByUser(String username);
    List<BookedTour> findAll();
    BookedTour findById (int id);
    BookedTour findByTourAndAccount (int tourId, String username);
    void create (BookTourRequest request, String username);
    void changeStatusBookedTour(BookedTour bookedTour, EBookedTour status);
}
