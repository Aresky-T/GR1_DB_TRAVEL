package com.gr1.service_imp;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.dtos.request.TouristListRequest;
import com.gr1.entity.*;
import com.gr1.exception.CustomException;
import com.gr1.repository.BookTourRepository;
import com.gr1.repository.TouristListRepository;
import com.gr1.service.IAccountService;
import com.gr1.service.IBookTourService;
import com.gr1.service.ITourService;
import com.gr1.service.ITouristListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
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
    private ITouristListService touristListService;

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
    public BookedTour create (BookTourRequest bookingInfo, Account account) {
        Tour tour = tourService.findById(bookingInfo.getTourId());

        // check customer has booked this tour, an exception is returned
        if(Boolean.TRUE.equals(bookTourRepository.existByAccountAndTour(account, tour))){
            throw new CustomException("Bạn đã đặt tour này rồi, không thể đặt lại!");
        }

        // check tourist count
        int touristsCount = bookingInfo.getTouristList().size();
        int currentAvailableSeats = tour.getAvailableSeats();

        if(touristsCount > currentAvailableSeats){
            throw new CustomException("Tổng số hành khách không thể vượt quá " + currentAvailableSeats + "!");
        }

        int adultNumber = bookingInfo.getAdultNumber();
        int childNumber = bookingInfo.getChildrenNumber();
        int babyNumber = bookingInfo.getBabyNumber();
        int adultPrice = adultNumber * tour.getPrice1();
        int childPrice = childNumber * tour.getPrice2();
        int babyPrice = babyNumber * tour.getPrice3();
        int totalPrice = adultPrice + childPrice + babyPrice;

        if(totalPrice != bookingInfo.getTotalPrice()){
            throw new CustomException("Tổng chi phí không hợp lệ!");
        }

        // generate the booked tour entity for requested information and save to database
//        BookedTour bt = getBookedTour(request, account, tour);
        BookedTour entity = bookingInfo.buildEntity();
        entity.setTour(tour);
        entity.setAccount(account);
        BookedTour bt = bookTourRepository.save(entity);

        // convert tourist dto list to the tourist entities list and set booked tour id for tourist entity
        // save all tourist entities list to database
        touristListService.saveAll(bookingInfo.getTouristList(), bt);

        // update available seats of current tour if successfully booked tour
        tour.setAvailableSeats(currentAvailableSeats - touristsCount);
        tourService.saveTour(tour);

        return bt;
    }

    @Transactional
    @Override
    public void changeStatusBookedTour (BookedTour bookedTour, EBookedTour status, EFormOfPayment formOfPayment) {
        if(bookedTour.getStatus().equals(EBookedTour.REJECTED)){
            throw new CustomException("Trạng thái đặt tour đã bị từ chối nên không thể cập nhật!");
        }

        if(status.equals(EBookedTour.PAY_UP) && Objects.isNull(formOfPayment)){
            throw new CustomException("Chưa chọn hình thức thanh toán!");
        }

        Tour tour = bookedTour.getTour();
        if(status.equals(EBookedTour.REJECTED)){
            tour.setAvailableSeats(tour.getAvailableSeats() + bookedTour.getTotalPersons());
            tourService.saveTour(tour);
        }
        bookedTour.setStatus(status);
        bookedTour.setFormOfPayment(status == EBookedTour.PAY_UP ? formOfPayment : null);
        bookTourRepository.save(bookedTour);
    }

    @Override
    public Boolean isBookedTourByUser (Account account, Tour tour) {
        return bookTourRepository.existByAccountAndTour(account, tour);
    }

    @Override
    public Boolean existById(int id) {
        return bookTourRepository.existsById(id);
    }

    @Override
    public BookedTour save(BookedTour entity) {
        return bookTourRepository.save(entity);
    }

    @Service
    public static class TouristListService implements ITouristListService {

        @Autowired
        private TouristListRepository touristListRepository;
        @Override
        public void saveAll(List<TouristList> touristList) {
            if(Objects.nonNull(touristList)){
                touristListRepository.saveAll(touristList);
            }
        }

        @Override
        public void saveAll(List<TouristListRequest> dtos, BookedTour bookedTour) {
            List<TouristList> entities = dtos.stream().map(t -> {
                TouristList tourist = t.buildEntity();
                tourist.setBookedTour(bookedTour);
                return tourist;
            }).collect(Collectors.toList());
            saveAll(entities);
        }
    }
}
