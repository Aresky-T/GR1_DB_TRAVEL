package com.gr1.controller;

import com.gr1.dtos.request.ReviewForm;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.dtos.response.ReviewResponse;
import com.gr1.dtos.response.TourReviews;
import com.gr1.entity.*;
import com.gr1.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

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
    private IBookTourService bookTourService;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping()
    public ResponseEntity<?> reviewTour(@RequestBody ReviewForm form, Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(form.getTourId());

        if(!bookTourService.existByAccountAndTour(account, tour)){
            return ResponseEntity.badRequest().body(new MessageResponse("Qúy khách không thể đánh giá Tour khi chưa đặt Tour!"));
        }

        if(form.getStars() < 1){
            return ResponseEntity.badRequest().body(new MessageResponse("Số sao không thể nhỏ hơn 1!"));
        }

        if(!tour.getStatus().equals(ETourStatus.FINISHED)){
            return ResponseEntity.badRequest().body(new MessageResponse("Vui lòng đánh giá sau khi chuyến đi kết thúc!"));
        }

        Review review = Optional.ofNullable(reviewService.findByAccountAndTour(account, tour))
                .map(r -> {
                    r.setStars(form.getStars());
                    r.setComment(form.getComment());
                    return r;
                }).orElseGet(() -> {
                    Review entity = form.buildEntity();
                    entity.setAccount(account);
                    entity.setTour(tour);
                    return entity;
                });
        reviewService.save(review);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<?> getAllForTour(@PathVariable(name = "tourId") int tourId){
        Tour tour = tourService.findById(tourId);
        List<Review> entities = reviewService.findAllByTour(tour);
        if(entities.isEmpty()){
            return ResponseEntity.ok(new MessageResponse("Không có dữ liệu!"));
        }

        TourReviews review = new TourReviews();

        int numberOfReviews = entities.size();
        AtomicInteger totalStars = new AtomicInteger(0);
        entities.forEach(r -> {
            totalStars.addAndGet(r.getStars());
        });
        float avgStars = (float) totalStars.get() / numberOfReviews;

        List<TourReviews.ReviewDTO> reviewDTOS = entities.stream().map(r -> {
            TourReviews.ReviewDTO dto = new TourReviews.ReviewDTO();
            dto.setId(r.getId());
            dto.setStars(r.getStars());
            dto.setComment(r.getComment());
            dto.setReviewTime(r.getReviewTime().toString());
            Account reviewer = r.getAccount();
            dto.setReviewer(new TourReviews.ReviewDTO.Reviewer(reviewer.getProfile().getFullName(), reviewer.getProfile().getAvatarUrl()));
           return dto;
        }).collect(Collectors.toList());

        review.setTourId(tour.getId());
        review.setNumberOfReviews(numberOfReviews);
        review.setAvgStars(avgStars);
        review.setReviewList(reviewDTOS);
        return ResponseEntity.ok(review);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/get-by-tour-and-account")
    public ResponseEntity<?> getByTourAndAccount(@RequestParam int tourId, Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Tour tour = tourService.findById(tourId);
        Review entity = reviewService.findByAccountAndTour(account, tour);
        if(Objects.isNull(entity)){
            return ResponseEntity.ok(new MessageResponse("Không có dữ liệu!"));
        }

        ReviewResponse dto = modelMapper.map(entity, ReviewResponse.class);
        return ResponseEntity.ok(dto);
    }
}
