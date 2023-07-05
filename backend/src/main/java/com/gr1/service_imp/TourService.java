package com.gr1.service_imp;

import com.gr1.dtos.request.TourFilter;
import com.gr1.dtos.request.TourRequest;
import com.gr1.entity.ETourGuideStatus;
import com.gr1.entity.Tour;
import com.gr1.entity.TourGuide;
import com.gr1.exception.CustomException;
import com.gr1.repository.TourRepository;
import com.gr1.service.ITourGuideService;
import com.gr1.service.ITourService;
import com.gr1.specification.TourSpecification;
import com.gr1.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import javax.transaction.Transactional;
import java.lang.reflect.Field;
import java.util.*;

@Service
public class TourService implements ITourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private ITourGuideService tourGuideService;

    @Override
    public Page<Tour> findAll (Pageable pageable) {
        return tourRepository.findAll(pageable);
    }

    @Override
    public List<Tour> getLatestTours (int count) {
//        PageRequest pageRequest = PageRequest.of(0, count, Sort.Direction.DESC, "createdTime");
//        return tourRepository.findAll(pageRequest).getContent();
        List<Tour> tourList = tourRepository.getToursOrderByCreatedTime(count);
        List<Tour> latest = new ArrayList<>();
        for (int i = 0; i < tourList.size(); i++) {
            if(i < count) {
                latest.add(tourList.get(i));
            }
        }
        return latest;
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

    @Override
    public Tour getTourByTourCode (String tourCode) {
        Optional<Tour> optional = tourRepository.getTourByTourCode(tourCode);
        if(optional.isEmpty()){
            throw new CustomException("Invalid tour_code: " + tourCode);
        }
        return optional.get();
    }

    @Transactional
    @Override
    public void saveTour (Tour tour) {
        tourRepository.save(tour);
    }

    @Transactional
    @Override
    public void createTour (TourRequest request) {
        Tour tour = request.buildEntity();
        tour.setAvailableSeats(request.getTotalSeats());
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
        int totalSeats = tour.getTotalSeats();
        int availableSeats = tour.getAvailableSeats();
        TourGuide currentTourGuide = tour.getTourGuide();
        fields.forEach((key, value) -> {
            switch (key){
                case "totalSeats":
                    int count = (int) value - totalSeats;
                    tour.setAvailableSeats(Math.max(availableSeats + count, 0));
                    break;
                case "tourGuideId":
                    if((int)value == 0){
                        tour.setTourGuide(null);
                        if(currentTourGuide != null){
                            currentTourGuide.setStatus(ETourGuideStatus.AVAILABLE);
                        }
                    } else {
                        TourGuide newTourGuide = tourGuideService.findById((int)value);
                        if(currentTourGuide != null){
                            currentTourGuide.setStatus(ETourGuideStatus.AVAILABLE);
                        }
                        newTourGuide.setStatus(ETourGuideStatus.BUSY);
                        tour.setTourGuide(newTourGuide);
                    }
                    break;
                case "startTime":
                    Date startTime = ConvertUtils.convertStringToDate((String) value);
                    tour.setStartTime(startTime);
                    break;
                default:
                    Field field = ReflectionUtils.findField(Tour.class, key);
                    if(field == null) {
                        throw new CustomException("Field is not found in tour");
                    }
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, tour, value);
            }
        });
        tourRepository.save(tour);
    }
}
