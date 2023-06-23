package com.gr1.service_imp;

import com.gr1.dtos.request.TourAttBlogContentRequest;
import com.gr1.entity.TourAttBlogContent;
import com.gr1.repository.TourAttBlogContentRepository;
import com.gr1.service.ITourAttBlogContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TourAttBlogContentService implements ITourAttBlogContentService {

    @Autowired
    private TourAttBlogContentRepository tourAttBlogContentRepository;

    @Override
    public void createTourAttBlogContent (List<TourAttBlogContentRequest> dtos) {
        List<TourAttBlogContent> listEntities = new ArrayList<>();
        for (TourAttBlogContentRequest dto : dtos) {
            TourAttBlogContent tourAttBlogContent = dto.buildEntity();
            listEntities.add(tourAttBlogContent);
        }
        tourAttBlogContentRepository.saveAll(listEntities);
    }

    public List<TourAttBlogContent> convertToEntities(List<TourAttBlogContentRequest> dtos){
        List<TourAttBlogContent> listEntities = new ArrayList<>();
        for (TourAttBlogContentRequest dto : dtos) {
            TourAttBlogContent tourAttBlogContent = dto.buildEntity();
            listEntities.add(tourAttBlogContent);
        }
        return listEntities;
    }
}
