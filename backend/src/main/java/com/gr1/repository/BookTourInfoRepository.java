package com.gr1.repository;

import com.gr1.entity.BookTourInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookTourInfoRepository extends JpaRepository<BookTourInfo, Integer> {
}
