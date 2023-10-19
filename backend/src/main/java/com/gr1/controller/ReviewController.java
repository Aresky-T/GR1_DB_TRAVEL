package com.gr1.controller;

import com.gr1.dtos.request.ReviewForm;
import com.gr1.dtos.response.ReviewResponse;
import com.gr1.entity.*;
import com.gr1.service.IAccountService;
import com.gr1.service.IProfileService;
import com.gr1.service.IReviewService;
import com.gr1.service.ITourService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;
    @Autowired
    private ITourService tourService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IProfileService profileService;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping()
    public ResponseEntity<?> reviewTour(@RequestBody ReviewForm form, Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(form.getTourId());
        Review review = form.buildEntity();
        if(tour.getStatus().equals(ETourStatus.FINISHED)){
            review.setTour(tour);
            review.setAccount(account);
            reviewService.save(review);
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<?> getAllForTour(@PathVariable(name = "tourId") int tourId){
        Tour tour = tourService.findById(tourId);
        List<Review> entities = reviewService.findAllByTour(tour);
        List<ReviewResponse> dtos = new ArrayList<>();
        for(Review review : entities){
            Account account = review.getAccount();
            Profile profile = profileService.findByAccount(account);
            ReviewResponse.Reviewer reviewer = modelMapper.map(profile, ReviewResponse.Reviewer.class);
            ReviewResponse dto = new ReviewResponse();
            dto.setId(review.getId());
            dto.setStars(review.getStars());
            dto.setComment(review.getComment());
            dto.setReviewTime(review.getReviewTime());
            dto.setReviewer(reviewer);
            dtos.add(dto);
        }
        return ResponseEntity.ok(dtos);
    }
}
