package com.gr1.controller;

import com.gr1.configuration.BookingStorageConfig;
import com.gr1.dtos.request.BookTourRequest;
import com.gr1.dtos.request.CancelBookedTourForm;
import com.gr1.dtos.request.ChangeFormOfPayment;
import com.gr1.dtos.request.ChangeStatusBookedTour;
import com.gr1.dtos.response.BookedTourResponse;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.email.IEmailService;
import com.gr1.entity.*;
import com.gr1.exception.CustomException;
import com.gr1.service.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/book-tour")
public class BookTourController {

    @Autowired
    private IBookTourService bookTourService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ITourService tourService;
    @Autowired
    private IRequestService requestService;
    @Autowired
    private IEmailService emailService;
    @Autowired
    private IVNPayService vnPayService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BookingStorageConfig bookingStorageConfig;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping()
    public ResponseEntity<?> bookTour(@RequestBody BookTourRequest request, Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        bookTourService.create(request, account);
        return ResponseEntity.ok("success");
    }


    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/with-payment-vnpay")
    public ResponseEntity<String> bookTourAndPaymentWithVNPay (
            @RequestBody BookTourRequest bookingInfo,
            Authentication authentication,
            HttpServletRequest request){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(bookingInfo.getTourId());

        // check booked tour by account
        boolean isBookedTour = bookTourService.isBookedTourByUser(account, tour);
        if(isBookedTour){
            throw new CustomException("Bạn đã đặt tour này rồi, không thể đặt lại!");
        }

        // config booking storage
        bookingStorageConfig.getBookingInfo().setValue(bookingInfo);
        bookingStorageConfig.getAccount().setValue(account);
        bookingStorageConfig.getTour().setValue(tour);

        // generate vnpay url for payment
        int amount = bookingInfo.getTotalPrice();
        String content = "THANH TOAN TOUR " + tour.getTourCode();
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayReturnUrl = vnPayService.createOrder(amount, content, baseUrl);

        return ResponseEntity.ok(vnpayReturnUrl);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getDetailsBookedTourById(@PathVariable Integer id){
        BookedTour bt = bookTourService.findById(id);
        BookedTourResponse dto = modelMapper.map(bt, BookedTourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/get-by-tour/{tourId}")
    public  ResponseEntity<?> getDetailsBookedTour (@PathVariable int tourId, Authentication authentication) {
        String username = authentication.getName();
        BookedTour bookedTour = bookTourService.findByTourAndAccount(tourId, username);
        BookedTourResponse dto = modelMapper.map(bookedTour, BookedTourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping()
    public ResponseEntity<?> getAll(Pageable pageable){
        Page<BookedTour> entities = bookTourService.findAll(pageable);
        Page<BookedTourResponse> dtos = entities.map(bt -> modelMapper.map(bt, BookedTourResponse.class));
        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user")
    public ResponseEntity<?> getAllByUser(Authentication authentication){
        String username = authentication.getName();
        List<BookedTour> entities = bookTourService.findAllByUser(username);
        List<BookedTourResponse> dtos = modelMapper.map(entities, new TypeToken<List<BookedTourResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/request-cancel-booked-tour/send")
    public ResponseEntity<?> sendRequestCancelBookedTour(@RequestBody CancelBookedTourForm form, Authentication authentication){
        String username = authentication.getName();
        requestService.addRequestCancelBookedTour(form, username);
        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/request-cancel-booked-tour/accept/{requestId}")
    public ResponseEntity<?> acceptRequestCancelBookedTour(@PathVariable(name = "requestId") Integer id){
        RequestCancelBookedTour request = requestService.findById(id);

        // Change Booked tour status
        BookedTour bookedTour = request.getBookedTour();
        bookTourService.changeStatusBookedTour(bookedTour, EBookedTour.REJECTED, null);

        // Send email
        Account account = bookedTour.getAccount();
        Date requestTime = request.getRequestTime();
        emailService.sendEmailToAcceptAnRequestFromUser(account.getEmail(), requestTime);

        // Delete request on database
        requestService.deleteRequestCancelBookedTour(id);

        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/change-status")
    public ResponseEntity<?> changeStatusBookedTour(@RequestBody ChangeStatusBookedTour form){
        BookedTour bookedTour = bookTourService.findById(form.getBookedTourId());
        EBookedTour status = form.getStatus();
        EFormOfPayment formOfPayment = form.getFormOfPayment();
        bookTourService.changeStatusBookedTour(bookedTour, status, formOfPayment);
        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/is-booked-tour-by-user/{tourId}")
    public ResponseEntity<?> isBookedTourByUser(Authentication authentication, @PathVariable Integer tourId) {
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(tourId);
        Boolean isBookedTour = bookTourService.isBookedTourByUser(account, tour);
        return ResponseEntity.ok(isBookedTour);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/change-form-of-payment")
    public ResponseEntity<?> changeFormOfPayment(@RequestBody ChangeFormOfPayment form){
        int bookedTourId = form.getBookedTourId();
        BookedTour bt = bookTourService.findById(bookedTourId);
        if(Boolean.FALSE.equals(bt.getStatus() == EBookedTour.PAY_UP)){
            return ResponseEntity.badRequest().body(new MessageResponse("Khách hàng chưa thanh toán tour này!"));
        }
        bt.setFormOfPayment(form.getFormOfPayment());
        bookTourService.save(bt);
        return ResponseEntity.ok("success");
    }
}
