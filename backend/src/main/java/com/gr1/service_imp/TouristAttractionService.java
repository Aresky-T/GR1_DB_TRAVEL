package com.gr1.service_imp;

import com.gr1.entity.TouristAttraction;
import com.gr1.repository.TouristAttractionRepository;
import com.gr1.service.ITouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TouristAttractionService implements ITouristAttractionService {

    @Autowired
    private TouristAttractionRepository touristAttractionRepository;

    @Override
    public List<TouristAttraction> findAll () {
        return touristAttractionRepository.findAll();
    }

    @Override
    public List<TouristAttraction> searchByName (String search) {
        return touristAttractionRepository.findByNameLike(search);
    }

    @Override
    public TouristAttraction findById (int id) {
        Optional<TouristAttraction> optional = touristAttractionRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public void createTouristAttraction (TouristAttraction touristAttraction) {

    }

    @Override
    public void updateTouristAttraction (TouristAttraction touristAttraction) {

    }

    @Override
    public void deleteTouristAttraction (int id) {

    }
}
