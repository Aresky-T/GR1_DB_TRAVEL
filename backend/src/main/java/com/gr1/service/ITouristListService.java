package com.gr1.service;

import com.gr1.dtos.request.TouristListRequest;
import com.gr1.entity.BookedTour;
import com.gr1.entity.TouristList;

import java.util.List;

public interface ITouristListService {
    public void saveAll(List<TouristList> touristList);
    public void saveAll(List<TouristListRequest> dtos, BookedTour bookedTour);
}
