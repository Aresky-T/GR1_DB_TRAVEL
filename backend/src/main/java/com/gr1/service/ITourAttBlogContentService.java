package com.gr1.service;

import com.gr1.dtos.request.TourAttBlogContentRequest;

import java.util.List;

public interface ITourAttBlogContentService {
    void createTourAttBlogContent(List<TourAttBlogContentRequest> dtos);
//    void updateTourAttBlogContent(TourAttBlogContent tourAttBlogContent);
//    void deleteTourAttBlogContent(int id);
}
