package com.gr1.service;

import com.gr1.entity.Tour;

import java.util.List;

public interface ITourService {
    List<Tour> findAll();
    Tour findById(int id);
    void createTour(Tour tour);
    void updateTour(Tour tour);
    void deleteTour(int tour);
}
