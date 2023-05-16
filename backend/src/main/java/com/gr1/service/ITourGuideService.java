package com.gr1.service;

import com.gr1.dtos.request.TourGuideRequest;
import com.gr1.entity.TourGuide;

import java.util.List;

public interface ITourGuideService {
    List<TourGuide> findAll();
    TourGuide findById(int id);
    void createTourGuide(TourGuideRequest form);
    void updateTourGuide(TourGuideRequest form, int id);
    void deleteTourGuide(int id);
}
