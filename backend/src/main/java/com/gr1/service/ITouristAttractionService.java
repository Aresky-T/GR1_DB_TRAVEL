package com.gr1.service;

import com.gr1.dtos.request.TourAttBlogContentRequest;
import com.gr1.dtos.request.TourAttBlogContentUpdateRequest;
import com.gr1.dtos.request.TouristAttRequest;
import com.gr1.entity.TouristAttraction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITouristAttractionService {
    Page<TouristAttraction> findAll(Pageable pageable);
    Page<TouristAttraction> searchByName (String search, Pageable pageable);
    List<TouristAttraction> searchByName(String search);
    List<TouristAttraction> findLatestTouristAttractions(int count);
    TouristAttraction findById(int id);
    void createTouristAttraction(TouristAttRequest touristAttRequest, List<TourAttBlogContentRequest> dtos);
    void updateTouristAttraction(TourAttBlogContentUpdateRequest request);
    void deleteTouristAttraction(int id);
}
