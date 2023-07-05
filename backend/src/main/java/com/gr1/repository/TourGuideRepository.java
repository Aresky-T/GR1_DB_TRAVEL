package com.gr1.repository;

import com.gr1.entity.ETourGuideStatus;
import com.gr1.entity.TourGuide;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourGuideRepository extends JpaRepository<TourGuide, Integer> {

    List<TourGuide> findAllByStatusIs (ETourGuideStatus status);
}
