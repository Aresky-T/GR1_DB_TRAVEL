package com.gr1.service_imp;

import com.gr1.dtos.request.TourFilter;
import com.gr1.dtos.request.TourRequest;
import com.gr1.entity.Tour;
import com.gr1.entity.TourGuide;
import com.gr1.exception.CustomException;
import com.gr1.repository.TourRepository;
import com.gr1.service.ITourGuideService;
import com.gr1.service.ITourService;
import com.gr1.specification.TourSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import javax.transaction.Transactional;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TourService implements ITourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private ITourGuideService tourGuideService;

    @Override
    public List<Tour> findAll () {
        return tourRepository.findAll();
    }

    public Page<Tour> fillAllAndFilter(Pageable pageable, TourFilter filter){
        Specification<Tour> where = TourSpecification.buildWhere(filter);
        return tourRepository.findAll(where, pageable);
    }

    @Override
    public Tour findById (int id) {
        Optional<Tour> optional = tourRepository.findById(id);
        if (optional.isPresent()){
            return optional.get();
        } else {
            throw new CustomException("Invalid tour_id: " + id);
        }
    }

    @Transactional
    @Override
    public void createTour (TourRequest request) {
        Tour tour = request.buildEntity();

        if(request.getTourGuide() == 0){
            tour.setTourGuide(null);
        } else {
            TourGuide tourGuide = tourGuideService.findById(request.getTourGuide());
            tour.setTourGuide(tourGuide);
        }
        tourRepository.save(tour);
    }

    @Transactional
    @Override
    public void deleteTour (int id) {
        Tour tour = findById(id);
        tourRepository.delete(tour);
    }

    @Transactional
    @Override
    public void updateTourByFields (Integer tourId, Map<String, Object> fields) {
        Tour tour = findById(tourId);
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(Tour.class, key);
            if(field == null) {
                throw new CustomException("Field is not found in tour");
            }
            field.setAccessible(true);
            ReflectionUtils.setField(field, tour, value);
        });
        tourRepository.save(tour);
    }
}
