package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.*;
import com.gr1.service.IBookTourService;
import com.gr1.service.ITouristListService;
import com.gr1.service.IVNPayService;
import com.gr1.service.IVnPayPaymentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@Controller
public class VNPayController {

    @Autowired
    private IVNPayService vnPayService;

    @Autowired
    private BookingStorageConfig bookingStorage;

    @Autowired
    private IBookTourService bookTourService;

    @Autowired
    private ITouristListService touristListService;

    @Autowired
    private IVnPayPaymentInfoService vnPayPaymentInfoService;

    @GetMapping("/payment/vnpay_return")
    public String handleVnPayReturn(HttpServletRequest request, Model model){
        int paymentStatus = vnPayService.orderReturn(request);
        System.out.println("----------------------------------------------");
        System.out.println("vnpay payment status: [ " + paymentStatus + " ]");
        System.out.println("----------------------------------------------");

        if(paymentStatus == 24){
            return "payment/cancel-payment";
        }

        if (paymentStatus != 1){
            return "payment/booking-failed";
        }

        BookingStorageConfig.BookingStorageElement<Integer> bookedTourIdConfig = bookingStorage.getBookedTourId();
        BookingStorageConfig.BookingStorageElement<BookTourRequest> bookingInfoConfig = bookingStorage.getBookingInfo();
        BookingStorageConfig.BookingStorageElement<Account> accountInfoConfig = bookingStorage.getAccount();
        BookingStorageConfig.BookingStorageElement<Tour> tourInfoConfig = bookingStorage.getTour();

        if(bookedTourIdConfig.getValue() != null){
            int bookedTourId = bookedTourIdConfig.getValue();
            handleUpdateBookedTourById(bookedTourId);
        } else {
            Account account = accountInfoConfig.getValue();
            Tour tour = tourInfoConfig.getValue();
            BookTourRequest bookingInfo = bookingInfoConfig.getValue();
            if(account != null && tour != null && bookingInfo != null){
                BookedTour bt = handleSaveNewBookingInfoToDB(bookingInfo, account, tour);
                bookingStorage.getBookedTourId().setValue(bt.getId());
            } else {
                System.out.println("booking storage info element null");
            }
        }

        extractAndAddAttributesToModel(request, model);

        return "payment/booking-success";
    }

    private void extractAndAddAttributesToModel(HttpServletRequest request, Model model){
        String[] attributeNames = {
                "vnp_TxnRef", "vnp_Amount", "vnp_OrderInfo", "vnp_ResponseCode",
                "vnp_TransactionNo", "vnp_BankCode", "vnp_PayDate"
        };

        VnPayPaymentInfo vnPayPaymentInfo = new VnPayPaymentInfo();
        vnPayPaymentInfo.setAmount(request.getParameter("vnp_Amount"));
        vnPayPaymentInfo.setOrderInfo(request.getParameter("vnp_OrderInfo"));
        vnPayPaymentInfo.setTxnRef(request.getParameter("vnp_TxnRef"));
        vnPayPaymentInfo.setTransactionNo(request.getParameter("vnp_TransactionNo"));

        if(bookingStorage.getBookedTourId().getValue() != null) {
            vnPayPaymentInfo.setBookedTour(bookTourService.findById(bookingStorage.getBookedTourId().getValue()));
        }

        vnPayPaymentInfoService.save(vnPayPaymentInfo);

        for(String attributeName : attributeNames){
            String attributeValue = request.getParameter(attributeName);
            if(attributeValue != null && !attributeValue.isEmpty()){
                model.addAttribute(attributeName, attributeValue);
            }
        }
    }

    private void handleUpdateBookedTourById(int bookedTourId){
        BookedTour bookedTour = bookTourService.findById(bookedTourId);
        saveBookedTourAfterPaymentSuccess(bookedTour);
    }

    private BookedTour handleSaveNewBookingInfoToDB(BookTourRequest bookingInfo, Account account, Tour tour) {
        BookedTour bt = bookTourService.create(bookingInfo, account);
        return saveBookedTourAfterPaymentSuccess(bt);
    }

    private BookedTour saveBookedTourAfterPaymentSuccess(BookedTour bookedTour){
        bookedTour.setStatus(EBookedTour.PAY_UP);
        bookedTour.setFormOfPayment(EFormOfPayment.VNPAY_ON_WEBSITE);
        return bookTourService.save(bookedTour);
    }
}
