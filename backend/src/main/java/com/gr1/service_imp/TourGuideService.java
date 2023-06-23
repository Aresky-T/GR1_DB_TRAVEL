package com.gr1.service_imp;

import com.gr1.dtos.request.TourGuideRequest;
import com.gr1.entity.TourGuide;
import com.gr1.exception.TourGuideException;
import com.gr1.repository.TourGuideRepository;
import com.gr1.service.ITourGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TourGuideService implements ITourGuideService {

    @Autowired
    private TourGuideRepository tourGuideRepository;

    @Override
    public List<TourGuide> findAll () {
        return tourGuideRepository.findAll();
    }

    @Override
    public TourGuide findById (int id) {
        Optional<TourGuide> optional = tourGuideRepository.findById(id);
        if (optional.isEmpty()){
            throw new TourGuideException("Invalid tour guide id: " + id);
        }
        return optional.get();
    }

    @Override
    public void createTourGuide (TourGuideRequest form) {
        TourGuide tourGuide = new TourGuide();
                tourGuide.setFullName(form.getFullName());
                tourGuide.setAvatarUrl(form.getAvatarUrl());
                tourGuide.setAge(form.getAge());
                tourGuide.setDescription(form.getDescription());
                tourGuide.setPhone(form.getPhone());
                tourGuide.setAddress(form.getAddress());
        tourGuideRepository.save(tourGuide);
    }

    @Transactional
    @Override
    public void updateTourGuide (TourGuideRequest form, int id) {
        TourGuide tourGuide = findById(id);
        if (!tourGuide.getFullName().equals(form.getFullName())) {
            tourGuide.setFullName(form.getFullName());
        }
        if (!tourGuide.getAvatarUrl().equals(form.getAvatarUrl())) {
            tourGuide.setAvatarUrl(form.getAvatarUrl());
        }
        if (!tourGuide.getAge().equals(form.getAge())) {
            tourGuide.setAge(form.getAge());
        }
        if (!tourGuide.getDescription().equals(form.getDescription())) {
            tourGuide.setDescription(form.getDescription());
        }
        if (!tourGuide.getPhone().equals(form.getPhone())) {
            tourGuide.setPhone(form.getPhone());
        }
        if (!tourGuide.getAddress().equals(form.getAddress())) {
            tourGuide.setAddress(form.getAddress());
        }
        tourGuideRepository.save(tourGuide);
    }

    @Override
    @Transactional
    public void deleteTourGuide (int id) {
        TourGuide tourGuide = findById(id);
        tourGuideRepository.delete(tourGuide);
    }
}
