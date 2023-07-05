package com.gr1.service;

import com.gr1.dtos.request.TourGuideRequest;
import com.gr1.entity.TourGuide;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ITourGuideService {
    Page<TourGuide> findAll(Pageable pageable);
    List<TourGuide> findAllAvailableStatus();
    TourGuide findById(int id);
    void createTourGuide(TourGuideRequest form);
    void updateTourGuide(TourGuideRequest form, int id);
    void updateByFields (Integer id, Map<String, Object> fields);
    void deleteTourGuide(int id);
}
