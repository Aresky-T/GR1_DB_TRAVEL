package com.gr1.repository;

import com.gr1.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TourRepository extends JpaRepository<Tour, Integer>, JpaSpecificationExecutor<Tour> {
    Optional<Tour> getTourByTourCode(String tourCode);

    @Query("SELECT T FROM Tour AS T WHERE T.status = 'NOT_STARTED' ORDER BY T.createdTime DESC")
    List<Tour> getToursOrderByCreatedTime(int count);
}
