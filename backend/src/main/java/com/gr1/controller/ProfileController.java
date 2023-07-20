package com.gr1.controller;

import java.util.Map;
import java.util.Objects;

import com.gr1.exception.ProfileException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.gr1.dtos.request.ProfileUpdate;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.dtos.response.ProfileResponse;
import com.gr1.entity.Account;
import com.gr1.entity.Profile;
import com.gr1.service.IAccountService;
import com.gr1.service.IProfileService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    @Autowired
    private IProfileService profileService;
    @Autowired
    private IAccountService accountService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        var profile = profileService.findByAccount(account);
        ProfileResponse profileDTO = modelMapper.map(profile, ProfileResponse.class);
        return ResponseEntity.ok(profileDTO);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody ProfileUpdate form, Authentication authentication) {
        try {
            String username = authentication.getName();
            Account account = accountService.findByUsername(username);
            Profile profile = profileService.updateProfile(form, account);
            ProfileResponse profileDTO = modelMapper.map(profile, ProfileResponse.class);
            return ResponseEntity.ok(profileDTO);
        } catch (ProfileException ex) {
            return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
        } catch (NullPointerException ex) {
            return ResponseEntity.badRequest().body(new MessageResponse("you must enter all values"));
        }
    }

    @PatchMapping()
    public ResponseEntity<?> updateByFields(@RequestBody Map<String, Object> fields, Authentication authentication) {
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Profile profile = profileService.findByAccount(account);
        profileService.updateProfileByFields(profile, fields);
        return ResponseEntity.ok("success");
    }
}
