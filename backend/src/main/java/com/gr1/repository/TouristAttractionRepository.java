package com.gr1.repository;

import com.gr1.entity.TouristAttraction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TouristAttractionRepository extends JpaRepository<TouristAttraction, Integer> {

    @Query("SELECT t from TouristAttraction t WHERE t.name LIKE %:search%")
    List<TouristAttraction> findByNameLike(@Param("search") String search);

    Page<TouristAttraction> findByNameLike(String search, Pageable pageable);

    @Query("SELECT t from TouristAttraction t ORDER BY t.createdTime DESC")
    List<TouristAttraction> findLatestTouristAttractions();
}
