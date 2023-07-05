package com.gr1.controller;

import com.gr1.dtos.request.TourGuideRequest;
import com.gr1.dtos.response.TourGuideResponse;
import com.gr1.entity.TourGuide;
import com.gr1.service.ITourGuideService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/tour_guide")
public class TourGuideController {

    @Autowired
    private ITourGuideService tourGuideService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<?> getAll(Pageable pageable){
        Page<TourGuide> result = tourGuideService.findAll(pageable);
        Page<TourGuideResponse> dtos = result.map(t -> modelMapper.map(t, TourGuideResponse.class));
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAllAvailableTourGuide(){
        List<TourGuide> entities = tourGuideService.findAllAvailableStatus();
        List<TourGuideResponse> dtos = modelMapper.map(entities, new TypeToken<List<TourGuideResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        TourGuide tourGuide = tourGuideService.findById(id);
        TourGuideResponse tourGuideResponse = modelMapper.map(tourGuide, TourGuideResponse.class);
        return ResponseEntity.ok(tourGuideResponse);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TourGuideRequest form){
        tourGuideService.createTourGuide(form);
        return ResponseEntity.ok("create success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody TourGuideRequest form, @PathVariable Integer id){
        tourGuideService.updateTourGuide(form, id);
        return ResponseEntity.ok("update success");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Map<String, Object> fields, @PathVariable Integer id){
        tourGuideService.updateByFields(id, fields);
        return ResponseEntity.ok("update success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        tourGuideService.deleteTourGuide(id);
        return ResponseEntity.ok("delete success");
    }
}
