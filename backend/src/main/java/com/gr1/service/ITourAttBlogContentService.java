package com.gr1.service;

import com.gr1.entity.TourAttBlogContent;

public interface ITourAttBlogContentService {
    void createTourAttBlogContent(TourAttBlogContent tourAttBlogContent);
    void updateTourAttBlogContent(TourAttBlogContent tourAttBlogContent);
    void deleteTourAttBlogContent(int id);
}
