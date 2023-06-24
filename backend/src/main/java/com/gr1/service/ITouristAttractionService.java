package com.gr1.service;

import com.gr1.dtos.request.TourAttBlogContentRequest;
import com.gr1.dtos.request.TourAttBlogContentUpdateRequest;
import com.gr1.dtos.request.TouristAttRequest;
import com.gr1.entity.TouristAttraction;

import java.util.List;

public interface ITouristAttractionService {
    List<TouristAttraction> findAll();
    List<TouristAttraction> searchByName(String search);
    List<TouristAttraction> findLatestTouristAttractions(int count);
    TouristAttraction findById(int id);
    void createTouristAttraction(TouristAttRequest touristAttRequest, List<TourAttBlogContentRequest> dtos);
    void updateTouristAttraction(TourAttBlogContentUpdateRequest request);
    void deleteTouristAttraction(int id);
}
