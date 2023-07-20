package com.gr1.service_imp;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.dtos.request.BookedTourUpdate;
import com.gr1.dtos.request.TouristListRequest;
import com.gr1.entity.*;
import com.gr1.exception.CustomException;
import com.gr1.repository.BookTourRepository;
import com.gr1.repository.TouristListRepository;
import com.gr1.service.IAccountService;
import com.gr1.service.IBookTourService;
import com.gr1.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookTourService implements IBookTourService {

    @Autowired
    private IAccountService accountService;
    @Autowired
    private ITourService tourService;
    @Autowired
    private BookTourRepository bookTourRepository;
    @Autowired
    private TouristListRepository touristListRepository;

    @Override
    public List<BookedTour> findAllByUser (String username) {
        Account account = accountService.findByUsername(username);
        return bookTourRepository.findAllByAccount(account);
    }

    @Override
    public List<BookedTour> findAll () {
        return bookTourRepository.findAll();
    }

    @Override
    public Page<BookedTour> findAll (Pageable pageable) {
        return bookTourRepository.findAll(pageable);
    }

    @Override
    public BookedTour findById (int id) {
        Optional<BookedTour> optional = bookTourRepository.findById(id);
        if(optional.isEmpty()){
            throw new CustomException("Id không hợp lệ");
        }
        return optional.get();
    }

    @Override
    public BookedTour findByTourAndAccount (int tourId, String username) {
        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(tourId);
        Optional<BookedTour> optional = bookTourRepository.findByTourAndAccount(tour, account);
        if(optional.isEmpty()){
            throw new CustomException("Tour này chưa được đặt");
        }
        return optional.get();
    }

    @Transactional
    @Override
    public void create (BookTourRequest request, String username) {

        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(request.getTourId());

        if(Boolean.TRUE.equals(bookTourRepository.existByAccountAndTour(account, tour))){
            throw new CustomException("bạn đã đặt tour này rồi, không thể đặt lại!");
        }

        List<TouristList> touristLists = new ArrayList<>();
        for (TouristListRequest dto : request.getTouristList()) {
            touristLists.add(dto.buildEntity());
        }

        int totalPersons = request.getAdultNumber() + request.getChildrenNumber() + request.getBabyNumber();
        int adultPrice = request.getAdultNumber() * tour.getPrice1();
        int childPrice = request.getChildrenNumber() * tour.getPrice2();
        int babyPrice = request.getBabyNumber() * tour.getPrice3();
        int totalPrice = adultPrice + childPrice + babyPrice;

        BookedTour bt = new BookedTour();
        bt.setFullName(request.getFullName());
        bt.setEmail(request.getEmail());
        bt.setPhone(request.getPhone());
        bt.setAddress(request.getAddress());
        bt.setTotalPersons(totalPersons);
        bt.setAdultNumber(request.getAdultNumber());
        bt.setChildrenNumber(request.getChildrenNumber());
        bt.setBabyNumber(request.getBabyNumber());
        bt.setNote(request.getNote());
        bt.setTotalPrice(totalPrice);
        bt.setTour(tour);
        bt.setAccount(account);
        bt.setStatus(EBookedTour.NOT_PAY);

        BookedTour newBookedTour = bookTourRepository.save(bt);
        touristLists.forEach(t -> {
            t.setBookedTour(newBookedTour);
        });
        touristListRepository.saveAll(touristLists);
        tour.setAvailableSeats(tour.getAvailableSeats() - newBookedTour.getTotalPersons());
        tourService.saveTour(tour);
    }

    @Transactional
    @Override
    public void changeStatusBookedTour (BookedTour bookedTour, EBookedTour status) {
        if(bookedTour.getStatus().equals(EBookedTour.REJECTED)){
            throw new CustomException("Trạng thái đặt tour đã bị từ chối nên không thể cập nhật!");
        }
        Tour tour = bookedTour.getTour();
        if(status.equals(EBookedTour.REJECTED)){
            tour.setAvailableSeats(tour.getAvailableSeats() + bookedTour.getTotalPersons());
            tourService.saveTour(tour);
        }
        bookedTour.setStatus(status);
        bookTourRepository.save(bookedTour);
    }

    @Override
    public Boolean isBookedTourByUser (Account account, Tour tour) {
        return bookTourRepository.existByAccountAndTour(account, tour);
    }
}
