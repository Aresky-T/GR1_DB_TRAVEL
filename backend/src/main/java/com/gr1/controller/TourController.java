package com.gr1.controller;

import com.gr1.dtos.request.TourFilter;
import com.gr1.dtos.request.TourRequest;
import com.gr1.dtos.response.TourResponse;
import com.gr1.entity.Tour;
import com.gr1.service.ITourService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/tours")
public class TourController {

    @Autowired
    private ITourService tourService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping()
    public ResponseEntity<?> createTour(@RequestBody TourRequest request) {
        tourService.createTour(request);
        return ResponseEntity.ok("success");
    }

    @GetMapping()
    public ResponseEntity<?> getAllTours() {
        List<Tour> entities = tourService.findAll();
        List<TourResponse> dtos = modelMapper.map(entities, new TypeToken<List<TourResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAllAndFilter(Pageable pageable, TourFilter filter){
        Page<Tour> entities = tourService.fillAllAndFilter(pageable, filter);
        List<TourResponse> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<TourResponse>>(){}.getType());
        Page<TourResponse> dtosPage = new PageImpl<>(dtos, pageable, entities.getTotalElements());
        return ResponseEntity.ok(dtosPage);
    }

    @GetMapping("/get-latest-tours/{count}")
    public ResponseEntity<?> getLatestTours(@PathVariable int count){
        List<Tour> tours = tourService.getLatestTours(count);
        List<TourResponse> dtos = modelMapper.map(tours, new TypeToken<List<TourResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTourById(@PathVariable(name = "id", required = true) Integer tourId){
        Tour tour = tourService.findById(tourId);
        TourResponse dto = modelMapper.map(tour, TourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/get-tour-by-tour-code/{tourCode}")
    public ResponseEntity<?> getTourByTourCode(@PathVariable String tourCode) {
        Tour tour = tourService.getTourByTourCode(tourCode);
        TourResponse dto = modelMapper.map(tour, TourResponse.class);
        return ResponseEntity.ok(dto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTour(@PathVariable(name = "id") Integer tourId, @RequestBody Map<String, Object> fields) {
        tourService.updateTourByFields(tourId, fields);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTourById(@PathVariable(name = "id") Integer tourId){
        tourService.deleteTour(tourId);
        return ResponseEntity.ok("success");
    }
}
