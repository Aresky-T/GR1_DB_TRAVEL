package com.gr1.service;

import com.gr1.entity.BookTourInfo;

import java.util.List;

public interface IBookTourInfoService {
    List<BookTourInfo> findAll();
    BookTourInfo findById(int id);
    void createBookTourInfo(BookTourInfo bookTourInfo);
    void updateBookTourInfo(BookTourInfo bookTourInfo);
    void deleteBookTourInfo(int id);
}
