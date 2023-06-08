package com.gr1.service;

import com.gr1.dtos.request.TourFilter;
import com.gr1.dtos.request.TourRequest;
import com.gr1.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ITourService {
    List<Tour> findAll();
    Page<Tour> fillAllAndFilter(Pageable pageable, TourFilter filter);
    Tour findById(int id);
    void createTour(TourRequest request);
    void deleteTour(int id);
    void updateTourByFields (Integer tourId, Map<String, Object> fields);
}
