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

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        BookedTour bt = bookTourService.findById(id);
        BookedTourResponse dto = modelMapper.map(bt, BookedTourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/get-by-tour/{tourId}")
    public  ResponseEntity<?> getByTourAndAccount (@PathVariable int tourId, Authentication authentication) {
        String username = authentication.getName();
        BookedTour bookedTour = bookTourService.findByTourAndAccount(tourId, username);
        BookedTourResponse dto = modelMapper.map(bookedTour, BookedTourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        List<BookedTour> entities = bookTourService.findAll();
        List<BookedTourResponse> dtos = modelMapper.map(entities, new TypeToken<List<BookedTourResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/get-all-by-user")
    public ResponseEntity<?> getAllByUser(Authentication authentication){
        String username = authentication.getName();
        List<BookedTour> entities = bookTourService.findAllByUser(username);
        List<BookedTourResponse> dtos = modelMapper.map(entities, new TypeToken<List<BookedTourResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/send-request-cancel-booked-tour")
    public ResponseEntity<?> sendRequestCancelBookedTour(@RequestBody CancelBookedTourForm form, Authentication authentication){
        String username = authentication.getName();
        requestService.addRequestCancelBookedTour(form, username);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/accept-request-cancel-booked-tour/{requestId}")
    public ResponseEntity<?> acceptRequestCancelBookedTour(@PathVariable(name = "requestId") Integer id){
        RequestCancelBookedTour request = requestService.findById(id);

        // Change Booked tour status
        BookedTour bookedTour = request.getBookedTour();
        bookTourService.changeStatusBookedTour(bookedTour, EBookedTour.CANCELLED);

        // Send email
        Account account = bookedTour.getAccount();
        Date requestTime = request.getRequestTime();
        emailService.sendEmailToAcceptAnRequestFromUser(account.getEmail(), requestTime);

        // Delete request on database
        requestService.deleteRequestCancelBookedTour(id);

        return ResponseEntity.ok("success");
    }
}
