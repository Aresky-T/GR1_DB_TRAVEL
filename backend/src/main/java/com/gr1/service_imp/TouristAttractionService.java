package com.gr1.service_imp;

import com.gr1.dtos.request.TourAttBlogContentRequest;
import com.gr1.dtos.request.TourAttBlogContentUpdateRequest;
import com.gr1.dtos.request.TouristAttRequest;
import com.gr1.entity.TourAttBlogContent;
import com.gr1.entity.TouristAttraction;
import com.gr1.exception.CustomException;
import com.gr1.repository.TourAttBlogContentRepository;
import com.gr1.repository.TouristAttractionRepository;
import com.gr1.service.ITouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TouristAttractionService implements ITouristAttractionService {

    @Autowired
    private TouristAttractionRepository touristAttractionRepository;
    @Autowired
    private TourAttBlogContentRepository tourAttBlogContentRepository;
    @Autowired
    private TourAttBlogContentService tourAttBlogContentService;

    @Override
    public List<TouristAttraction> findAll () {
        return touristAttractionRepository.findAll();
    }

    @Override
    public List<TouristAttraction> searchByName (String search) {
        return touristAttractionRepository.findByNameLike(search);
    }

    @Override
    public TouristAttraction findById (int id) {
        Optional<TouristAttraction> optional = touristAttractionRepository.findById(id);
        if (optional.isPresent()){
            return optional.get();
        } else {
            throw new CustomException("Invalid tourist attraction id");
        }
    }

    @Transactional
    @Override
    public void createTouristAttraction (TouristAttRequest touristAttRequest, List<TourAttBlogContentRequest> dtos) {
        TouristAttraction touristAttraction = touristAttRequest.buildEntity();
        List<TourAttBlogContent> tourAttBlogContents = tourAttBlogContentService.convertToEntities(dtos);
        tourAttBlogContents.stream().peek(t -> t.setTouristAttraction(touristAttraction)).collect(Collectors.toList());
        if (tourAttBlogContents.isEmpty()){
            throw new CustomException("Tourist Attraction Blog Content cannot be null");
        }
        touristAttraction.setContents(tourAttBlogContents);
        touristAttractionRepository.save(touristAttraction);
        tourAttBlogContentRepository.saveAll(tourAttBlogContents);
    }

    @Transactional
    @Override
    public void updateTouristAttraction (TourAttBlogContentUpdateRequest request) {
        if(!touristAttractionRepository.existsById(request.getId())){
            throw new CustomException("Invalid Tourist Attraction");
        }

        TouristAttraction touristAttraction = findById(request.getId());
        touristAttraction.setName(request.getName());
        touristAttraction.setTitle(request.getTitle());
        touristAttraction.setImageUrl(request.getImageUrl());
        touristAttraction.setIntro(request.getIntro());

        List<TourAttBlogContent> listContents = request.getListContents()
                .stream().map(dto -> {
            TourAttBlogContent entity = dto.buildEntity();
            entity.setTouristAttraction(touristAttraction);
            return entity;
        }).collect(Collectors.toList());

        touristAttractionRepository.save(touristAttraction);
        tourAttBlogContentRepository.saveAll(listContents);
    }

    @Transactional
    @Override
    public void deleteTouristAttraction (int id) {
        TouristAttraction touristAttraction = findById(id);
        touristAttractionRepository.delete(touristAttraction);
    }
}
