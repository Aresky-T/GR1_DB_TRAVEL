package com.gr1.controller;

import com.gr1.dtos.request.TourAttBlogContentUpdateRequest;
import com.gr1.dtos.request.TouristAttRequest;
import com.gr1.dtos.response.TouristAttractionResponse;
import com.gr1.entity.TouristAttraction;
import com.gr1.service.ITouristAttractionService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/tourist-attraction")
public class TouristAttractionController {

    @Autowired
    private ITouristAttractionService touristAttractionService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/search")
    public ResponseEntity<?> searchByName(Pageable pageable, @RequestParam(required = false) String search){
        Page<TouristAttraction> result = touristAttractionService.searchByName(search, pageable);
        Page<TouristAttractionResponse> dtos = result.map(touristAttraction -> modelMapper.map(touristAttraction, TouristAttractionResponse.class));
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TouristAttRequest touristAttRequest){
        touristAttractionService.createTouristAttraction(touristAttRequest, touristAttRequest.getListContents());
        return ResponseEntity.ok("success");
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllTouristAttractions(Pageable pageable){
        Page<TouristAttraction> touristAttractions = touristAttractionService.findAll(pageable);
//        List<TouristAttractionResponse> dtos = modelMapper.map(touristAttractions, new TypeToken<List<TouristAttractionResponse>>(){}.getType());
        Page<TouristAttractionResponse> dtos = touristAttractions.map(t -> modelMapper.map(t, TouristAttractionResponse.class));
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/get-latest-tourist-attractions/{count}")
    public ResponseEntity<?> getLatestTouristAttractions (@PathVariable int count){
        List<TouristAttraction> touristAttractions = touristAttractionService.findLatestTouristAttractions(count);
        List<TouristAttractionResponse> dtos = modelMapper.map(touristAttractions, new TypeToken<List<TouristAttractionResponse>>(){}.getType());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        TouristAttraction touristAttraction = touristAttractionService.findById(id);
        TouristAttractionResponse response = modelMapper.map(touristAttraction, TouristAttractionResponse.class);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    public ResponseEntity<?> updateTouristAttraction(@RequestBody TourAttBlogContentUpdateRequest request){
        touristAttractionService.updateTouristAttraction(request);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTouristAttraction(@PathVariable Integer id){
        touristAttractionService.deleteTouristAttraction(id);
        return ResponseEntity.ok("success");
    }
}
