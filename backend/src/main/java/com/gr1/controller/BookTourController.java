package com.gr1.controller;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.dtos.request.CancelBookedTourForm;
import com.gr1.dtos.response.BookedTourResponse;
import com.gr1.email.IEmailService;
import com.gr1.entity.Account;
import com.gr1.entity.BookedTour;
import com.gr1.entity.EBookedTour;
import com.gr1.entity.RequestCancelBookedTour;
import com.gr1.service.IAccountService;
import com.gr1.service.IBookTourService;
import com.gr1.service.IRequestService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/book-tour")
public class BookTourController {

    @Autowired
    private IBookTourService bookTourService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IRequestService requestService;
    @Autowired
    private IEmailService emailService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping()
    public ResponseEntity<?> createBookTour(@RequestBody BookTourRequest request, Authentication authentication){
        String username = authentication.getName();
        bookTourService.create(request, username);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/get-by-ids")
    public ResponseEntity<?> getByIds(@RequestParam int accountId, @RequestParam int tourId){
        BookedTour bt = bookTourService.findByIds(accountId, tourId);
        BookedTourResponse dto = modelMapper.map(bt, BookedTourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        List<BookedTour> entities = bookTourService.findAll();
        List<BookedTourResponse> dtos = modelMapper.map(entities, new TypeToken<List<BookedTourResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/send-request-cancel-booked-tour")
    public ResponseEntity<?> sendRequestCancelBookedTour(@RequestBody CancelBookedTourForm form, Authentication authentication){
        int accountId = accountService.findByUsername(authentication.getName()).getId();
        requestService.addRequestCancelBookedTour(form, accountId);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/accept-request-cancel-booked-tour/{requestId}")
    public ResponseEntity<?> acceptRequestCancelBookedTour(@PathVariable(name = "requestId") Integer id){
        RequestCancelBookedTour request = requestService.findById(id);

        // Change Booked tour status
        BookedTour bookedTour = bookTourService.findByIds(request.getAccount().getId(), request.getTour().getId());
        bookTourService.changeStatusBookedTour(bookedTour, EBookedTour.CANCELLED);

        // Send email
        Account account = requestService.getAccountById(id);
        Date requestTime = request.getRequestTime();
        requestService.deleteRequestCancelBookedTour(id);
        emailService.sendEmailToAcceptAnRequestFromUser(account.getEmail(), requestTime);
        return ResponseEntity.ok("success");
    }
}
