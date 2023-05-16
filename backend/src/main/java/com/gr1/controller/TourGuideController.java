package com.gr1.controller;

import com.gr1.dtos.request.TourGuideRequest;
import com.gr1.entity.TourGuide;
import com.gr1.service.ITourGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/tour_guide")
public class TourGuideController {

    @Autowired
    private ITourGuideService tourGuideService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        List<TourGuide> result = tourGuideService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        TourGuide tourGuide = tourGuideService.findById(id);
        return ResponseEntity.ok(tourGuide);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TourGuideRequest form){
        tourGuideService.createTourGuide(form);
        return ResponseEntity.ok("create success");
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody TourGuideRequest form, @RequestParam Integer id){
        tourGuideService.updateTourGuide(form, id);
        return ResponseEntity.ok("update success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        tourGuideService.deleteTourGuide(id);
        return ResponseEntity.ok("delete success");
    }
}
