package com.gr1.service_imp;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.*;
import com.gr1.exception.CustomException;
import com.gr1.repository.BookTourRepository;
import com.gr1.service.IAccountService;
import com.gr1.service.IBookTourService;
import com.gr1.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BookTourService implements IBookTourService {

    @Autowired
    private IAccountService accountService;
    @Autowired
    private ITourService tourService;
    @Autowired
    private BookTourRepository bookTourRepository;

    @Override
    public List<BookedTour> findAll () {
        return bookTourRepository.findAll();
    }

    @Override
    public BookedTour findByIds (int accountId, int tourId) {
        Account account = accountService.findById(accountId);
        Tour tour = tourService.findById(tourId);
        if(!bookTourRepository.existByAccountAndTour(account, tour)){
            throw new CustomException("BookTourInfo does not exist");
        }
        return bookTourRepository.findByAccountAndTour(account, tour);
    }

    @Transactional
    @Override
    public void create (BookTourRequest request, String username) {

        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(request.getTourId());

        if(Boolean.TRUE.equals(bookTourRepository.existByAccountAndTour(account, tour))){
            throw new CustomException("bạn đã đặt tour này rồi, không thể đặt lại!");
        }

        BookedTourPK primaryKey = new BookedTourPK(account.getId(), tour.getId());
        BookedTour bt = new BookedTour();
        bt.setFullName(request.getFullName());
        bt.setEmail(request.getEmail());
        bt.setPhone(request.getPhone());
        bt.setAddress(request.getAddress());
        bt.setTotalPersons(request.getTotalPersons());
        bt.setAdultNumber(request.getAdultNumber());
        bt.setChildrenNumber(request.getChildrenNumber());
        bt.setBabyNumber(request.getBabyNumber());
        bt.setNote(request.getNote());
        bt.setTotalPrice(request.getTotalPrice());
        bt.setTour(tour);
        bt.setAccount(account);
        bt.setId(primaryKey);
        bt.setStatus(EBookedTour.NOT_STARTED);
        bookTourRepository.save(bt);
    }

    @Override
    public void changeStatusBookedTour (BookedTour bookedTour, EBookedTour status) {
        bookedTour.setStatus(status);
        bookTourRepository.save(bookedTour);
    }
}
