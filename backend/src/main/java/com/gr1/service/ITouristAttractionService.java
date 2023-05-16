package com.gr1.service;

import com.gr1.entity.TouristAttraction;

import java.util.List;

public interface ITouristAttractionService {
    List<TouristAttraction> findAll();
    List<TouristAttraction> searchByName(String search);
    TouristAttraction findById(int id);
    void createTouristAttraction(TouristAttraction touristAttraction);
    void updateTouristAttraction(TouristAttraction touristAttraction);
    void deleteTouristAttraction(int id);
}
