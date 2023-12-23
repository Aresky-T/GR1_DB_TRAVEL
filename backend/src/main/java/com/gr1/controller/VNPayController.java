package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;
import com.gr1.entity.EFormOfPayment;
import com.gr1.service.IAccountService;
import com.gr1.service.IBookTourService;
import com.gr1.service.IVNPayService;
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
    private IAccountService accountService;

    @GetMapping("/payment/vnpay_return")
    public String GetMapping(HttpServletRequest request, Model model){
        int paymentStatus = vnPayService.orderReturn(request);
        String paymentTransactionCode = request.getParameter("vnp_TxnRef");
        String totalPrice = request.getParameter("vnp_Amount");
        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentErrorCode = request.getParameter("vnp_ResponseCode");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String bankCode = request.getParameter("vnp_BankCode");
        String paymentDate = request.getParameter("vnp_PayDate");

        model.addAttribute("paymentTransactionCode", paymentTransactionCode);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("orderInfo", orderInfo);
        model.addAttribute("paymentErrorCode", paymentErrorCode);
        model.addAttribute("transactionId", transactionId);
        model.addAttribute("bankCode", bankCode);
        model.addAttribute("paymentDate", paymentDate);
        model.addAttribute("paymentStatus", paymentStatus);

        BookTourRequest bookingInfo = bookingStorage.getBookingInfo();
        Account account = bookingStorage.getAccount();

        if(paymentStatus == 1){
            if(bookingInfo != null && account != null){
                BookedTour newBooking = bookTourService.create(bookingInfo, account);
                newBooking.setStatus(EBookedTour.PAY_UP);
                newBooking.setFormOfPayment(EFormOfPayment.VNPAY_ON_WEBSITE);
                bookTourService.save(newBooking);
            }
        }
        return "payment/vnpay_return";
    }
}
