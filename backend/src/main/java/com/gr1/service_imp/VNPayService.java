package com.gr1.service_imp;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.configuration.VNPayConfig;
import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import com.gr1.entity.Tour;
import com.gr1.exception.CustomException;
import com.gr1.service.IBookTourService;
import com.gr1.service.ITourService;
import com.gr1.service.IVNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class VNPayService implements IVNPayService {

    @Autowired
    private ITourService tourService;

    @Autowired
    private BookingStorageConfig bookingStorage;

    @Autowired
    private IBookTourService bookTourService;

    @Override
    public String createOrder(BookTourRequest bookTourRequest, Account account, String urlReturn) {
        Tour tour = tourService.findById(bookTourRequest.getTourId());
        String bookingInfo = "THANH TOAN TOUR " + tour.getTourCode();
        if(bookTourService.isBookedTourByUser(account, tour)){
           throw new CustomException("Bạn đã đặt tour này rồi!");
        }

        int total = bookTourRequest.getTotalPrice();
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String orderType = "order-type";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(total*100));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", bookingInfo);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        urlReturn += VNPayConfig.vnp_ReturnUrl;
        vnp_Params.put("vnp_ReturnUrl", urlReturn);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    public int orderReturn(HttpServletRequest request) {
        AtomicInteger paymentStatus = new AtomicInteger(0);
        BookTourRequest bookingInfo = bookingStorage.getBookingInfo();
        // ex: PaymentStatus = 0; pending
        //  PaymentStatus = 1; success
        //  PaymentStatus = -1; Failed
        //  Begin process return from VNPAY
        Map<String, String> fields = new HashMap<>();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        int vnp_Amount = Integer.parseInt(request.getParameter("vnp_Amount"));

        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }

        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }

        // Check checksum
        String signValue = VNPayConfig.hashAllFields(fields);

        if (signValue.equals(vnp_SecureHash)) {
            boolean checkOrderId = Objects.nonNull(bookingInfo); // vnp_TxnRef exists in your database
            boolean checkAmount = vnp_Amount/100 == bookingInfo.getTotalPrice(); // vnp_Amount is valid (Check vnp_Amount VNPAY returns compared to the amount of the code (vnp_TxnRef) in the Your database).
            boolean checkBookingStatus = paymentStatus.get() == 0; // PaymentStatus = 0 (pending)

            if(checkOrderId) {
                if(checkAmount) {
                    if (checkBookingStatus){
                        if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
                            paymentStatus.set(1);
                        } else {
                            // Here Code update PaymentStatus = 0 into your Database
                            paymentStatus.set(0);
                        }
                        System.out.println("{\"RspCode\":\"00\",\"Message\":\"Confirm Success\"}");
                    } else {
                        paymentStatus.set(2);
                        System.out.println("{\"RspCode\":\"02\",\"Message\":\"Booking already confirmed\"}");
                    }
                } else {
                    paymentStatus.set(3);
                    System.out.println("{\"RspCode\":\"03\",\"Message\":\"Invalid Amount\"}");
                }
            } else {
                paymentStatus.set(4);
                System.out.println("{\"RspCode\":\"04\",\"Message\":\"Order not Found\"}");
            }
        } else {
            paymentStatus.set(-1);
            System.out.println("{\"RspCode\":\"97\",\"Message\":\"Invalid Checksum\"}");
        }
        return paymentStatus.get();
    }
}
