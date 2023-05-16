package com.gr1.repository;

import com.gr1.entity.TourAttBlogContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourAttBlogContentRepository extends JpaRepository<TourAttBlogContent, Integer> {
}
