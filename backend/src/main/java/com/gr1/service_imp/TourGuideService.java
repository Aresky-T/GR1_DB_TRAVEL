package com.gr1.service_imp;

import com.gr1.dtos.request.TourGuideRequest;
import com.gr1.entity.ETourGuideStatus;
import com.gr1.entity.TourGuide;
import com.gr1.exception.TourGuideException;
import com.gr1.repository.TourGuideRepository;
import com.gr1.service.ITourGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TourGuideService implements ITourGuideService {

    @Autowired
    private TourGuideRepository tourGuideRepository;

    @Override
    public Page<TourGuide> findAll (Pageable pageable) {
        return tourGuideRepository.findAll(pageable);
    }

    @Override
    public List<TourGuide> findAllAvailableStatus () {
        return tourGuideRepository.findAllByStatusIs(ETourGuideStatus.AVAILABLE);
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
        tourGuide.setGender(form.getGender());
        tourGuide.setBirthDate(form.getBirthDate());
        tourGuide.setDescription(form.getDescription());
        tourGuide.setPhone(form.getPhone());
        tourGuide.setAddress(form.getAddress());
        tourGuide.setStatus(ETourGuideStatus.AVAILABLE);
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
        if (!tourGuide.getGender().equals(form.getGender())) {
            tourGuide.setGender(form.getGender());
        }
        if (!tourGuide.getBirthDate().equals(form.getBirthDate())) {
            tourGuide.setBirthDate(form.getBirthDate());
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
        if(!tourGuide.getStatus().equals(form.getStatus())) {
            tourGuide.setStatus(form.getStatus());
        }
        tourGuideRepository.save(tourGuide);
    }

    @Transactional
    @Override
    public void updateByFields (Integer id, Map<String, Object> fields) {
        TourGuide tourGuide = findById(id);
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(TourGuide.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, tourGuide, value);
        });
        tourGuideRepository.save(tourGuide);
    }

    @Override
    @Transactional
    public void deleteTourGuide (int id) {
        TourGuide tourGuide = findById(id);
        tourGuideRepository.delete(tourGuide);
    }
}
