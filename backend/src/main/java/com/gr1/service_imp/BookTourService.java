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
import java.util.stream.Collectors;

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
    public BookedTour create (BookTourRequest request, Account account) {
        Tour tour = tourService.findById(request.getTourId());

        // check customer has booked this tour, an exception is returned
        if(Boolean.TRUE.equals(bookTourRepository.existByAccountAndTour(account, tour))){
            throw new CustomException("Bạn đã đặt tour này rồi, không thể đặt lại!");
        }

        // check tourist count
        int touristsCount = request.getTouristList().size();
        int currentAvailableSeats = tour.getAvailableSeats();

        if(touristsCount > currentAvailableSeats){
            throw  new CustomException("Tổng số hành khách không thể vượt quá " + currentAvailableSeats + "!");
        }

        // generate the booked tour entity for requested information and save to database
        BookedTour bt = getBookedTour(request, account, tour);
        BookedTour newBookedTour = bookTourRepository.save(bt);

        // convert tourist dto list to the tourist entities list and set booked tour id for tourist entity
        List<TouristList> touristLists = request.getTouristList()
                .stream()
                .map(t -> {
                    TouristList touristList = t.buildEntity();
                    touristList.setBookedTour(newBookedTour);
                    return touristList;
                })
                .collect(Collectors.toList());

        // save all tourist entities list to database
        touristListRepository.saveAll(touristLists);

        // update available seats of current tour if successfully booked tour
        tour.setAvailableSeats(currentAvailableSeats - touristsCount);
        tourService.saveTour(tour);
        return newBookedTour;
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

    @Override
    public void save(BookedTour entity) {
        bookTourRepository.save(entity);
    }

    private BookedTour getBookedTour(BookTourRequest request, Account account, Tour tour) {
        int adultNumber = request.getAdultNumber();
        int childNumber = request.getChildrenNumber();
        int babyNumber = request.getBabyNumber();
        int totalPersons = adultNumber + childNumber + babyNumber;

        int adultPrice = adultNumber * tour.getPrice1();
        int childPrice = childNumber * tour.getPrice2();
        int babyPrice = babyNumber * tour.getPrice3();

        int totalPrice = adultPrice + childPrice + babyPrice;

        if(totalPrice != request.getTotalPrice()){
            throw new CustomException("Tổng chi phí không hợp lệ!");
        }

        BookedTour bt = new BookedTour();
        bt.setFullName(request.getFullName());
        bt.setEmail(request.getEmail());
        bt.setPhone(request.getPhone());
        bt.setAddress(request.getAddress());
        bt.setTotalPersons(totalPersons);
        bt.setAdultNumber(adultNumber);
        bt.setChildrenNumber(childNumber);
        bt.setBabyNumber(babyNumber);
        bt.setNote(request.getNote());
        bt.setTotalPrice(totalPrice);
        bt.setTour(tour);
        bt.setAccount(account);
        bt.setStatus(EBookedTour.NOT_PAY);
        return bt;
    }
}
