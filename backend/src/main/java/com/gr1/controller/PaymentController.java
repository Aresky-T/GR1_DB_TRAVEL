package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.entity.Account;
import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;
import com.gr1.entity.Tour;
import com.gr1.exception.CustomException;
import com.gr1.service.IBookTourService;
import com.gr1.service.IVNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private IBookTourService bookTourService;

    @Autowired
    private BookingStorageConfig bookingStorageConfig;

    @Autowired
    private IVNPayService vnPayService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/vnpay/booked-tour")
    public ResponseEntity<?> paymentBookedTourWithVNPay(
            @RequestParam(name = "bookedTourId") int bookedTourId,
            HttpServletRequest request
    ){
        // find booked tour from database by id
        BookedTour bookedTour = bookTourService.findById(bookedTourId);

        if(bookedTour.getStatus().equals(EBookedTour.PAY_UP)){
            return ResponseEntity.badRequest().body(new MessageResponse("Bạn đã thanh toán Tour này, không thể tiếp tục!"));
        }

        Account account = bookedTour.getAccount();
        Tour tour = bookedTour.getTour();

        // Get element from booking storage by account and tour
        BookingStorageConfig.Element element = bookingStorageConfig.checkElementAndCreateOrUpdate(account, tour);
        if(element == null){
            return ResponseEntity.badRequest().body(new MessageResponse("Không thể tạo phiên thanh toán!"));
        }
        // generate vnpay url for payment
        String vnpReturnUrl = vnPayService.createOrder(element, request);

        return ResponseEntity.ok(vnpReturnUrl);
    }
}
