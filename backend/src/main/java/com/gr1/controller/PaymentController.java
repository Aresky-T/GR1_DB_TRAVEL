package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.entity.BookedTour;
import com.gr1.service.IBookTourService;
import com.gr1.service.IVNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/vnpay/booked-tour")
    public ResponseEntity<String> paymentBookedTourWithVNPay(
            @RequestParam(name = "bookedTourId") int bookedTourId,
            HttpServletRequest request
    ){
        // find booked tour from database by id
        BookedTour bookedTour = bookTourService.findById(bookedTourId);

        // update bookedTourId in bookingStorageConfig
        bookingStorageConfig.getBookedTourId().setValue(bookedTourId);

        // generate vnpay url for payment
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        int amount = bookedTour.getTotalPrice();
        String content = "THANH TOAN TOUR " + bookedTour.getTour().getTourCode();
        String vnpReturnUrl = vnPayService.createOrder(amount, content, baseUrl);

        return ResponseEntity.ok(vnpReturnUrl);
    }
}
