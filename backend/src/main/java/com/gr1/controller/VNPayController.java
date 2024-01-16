package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.*;
import com.gr1.service.IBookTourService;
import com.gr1.service.IVNPayService;
import com.gr1.service.IVnPayPaymentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.Optional;

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
    private IVnPayPaymentInfoService vnPayPaymentInfoService;

    @GetMapping("/payment/vnpay_return")
    public String handleVnPayReturn(HttpServletRequest request, Model model){
        String vnp_OrderInfo = request.getParameter("vnp_OrderInfo");
        String vnp_TxnRef = request.getParameter("vnp_TxnRef");
        String title = vnp_OrderInfo + "_" + vnp_TxnRef;
        BookingStorageConfig.Element element = bookingStorage.getElement(title);
        int paymentStatus = vnPayService.orderReturn(request);

        System.out.println("----------------------------------------------");
        System.out.println("vnpay payment status: [ " + paymentStatus + " ]");
        System.out.println("session: [ " + element.getTitle() + " ]");
        System.out.println("----------------------------------------------");

        if(paymentStatus == 24){
            bookingStorage.removeElement(element);
            return "payment/cancel-payment";
        }

        if (paymentStatus != 1){
            bookingStorage.removeElement(element);
            return "payment/booking-failed";
        }

        BookTourRequest bookingInfo = element.getBookingInfo();
        System.out.println(bookingInfo);
        System.out.println("----------------------------------------------");
        BookedTour bookedTour = Optional.ofNullable(bookingInfo)
                .map((dto) ->  bookTourService.create(dto, element.getAccount()))
                .orElseGet(() -> bookTourService.findByTourAndAccount(element.getTour(), element.getAccount()));

        bookedTour.setStatus(EBookedTour.PAY_UP);
        bookedTour.setFormOfPayment(EFormOfPayment.VNPAY_ON_WEBSITE);

        VnPayPaymentInfo vnPayPaymentInfo = new VnPayPaymentInfo();
        vnPayPaymentInfo.setAmount(request.getParameter("vnp_Amount"));
        vnPayPaymentInfo.setOrderInfo(request.getParameter("vnp_OrderInfo"));
        vnPayPaymentInfo.setTxnRef(request.getParameter("vnp_TxnRef"));
        vnPayPaymentInfo.setTransactionNo(request.getParameter("vnp_TransactionNo"));
        vnPayPaymentInfo.setBookedTour(bookTourService.save(bookedTour));

        vnPayPaymentInfoService.save(vnPayPaymentInfo);
        extractAndAddAttributesToModel(request, model);

        bookingStorage.removeElement(element);
        return "payment/booking-success";
    }

    private void extractAndAddAttributesToModel(HttpServletRequest request, Model model){
        String[] attributeNames = {
                "vnp_TxnRef", "vnp_Amount", "vnp_OrderInfo", "vnp_ResponseCode",
                "vnp_TransactionNo", "vnp_BankCode", "vnp_PayDate"
        };

        for(String attributeName : attributeNames){
            String attributeValue = request.getParameter(attributeName);
            if(attributeValue != null && !attributeValue.isEmpty()){
                model.addAttribute(attributeName, attributeValue);
            }
        }
    }
}
