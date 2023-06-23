package com.gr1.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping("/cloudinary/upload")
    public ResponseEntity<?> updateMultipartFile(@RequestBody  MultipartFile[] files) throws IOException {
        List<String> URLS = new ArrayList<>();
        for(MultipartFile file : files){
            try {
                Map r = this.cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto")
                );

                String img = (String) r.get("secure_url");
                URLS.add(img);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(URLS);
    }
}
