package com.gr1.controller;

import java.util.Optional;

import com.gr1.exception.ProfileException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gr1.dtos.request.ProfileUpdate;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.dtos.response.ProfileResponse;
import com.gr1.entity.Account;
import com.gr1.entity.EGender;
import com.gr1.entity.Profile;
import com.gr1.service.IAccountService;
import com.gr1.service.IProfileService;

import javax.validation.constraints.Null;

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
        if (account == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid account"));
        }
        Optional<Profile> result = profileService.findByAccount(account);
        if (result.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No profile for account_id = " + account.getId()));
        }
        var profile = result.get();
        if (profile.getAvatarUrl() == null || profile.getDateOfBirth() == null || profile.getFullName() == null
                || profile.getGender() == null || profile.getPhone() == null) {
            return  ResponseEntity.badRequest().body(new MessageResponse("Please update your profile"));
        }
        ProfileResponse profileDTO = modelMapper.map(profile, ProfileResponse.class);
        return ResponseEntity.ok(profileDTO);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody ProfileUpdate form, Authentication authentication) {
        try {
            String username = authentication.getName();
            Profile profile = profileService.updateProfile(form, username);
            ProfileResponse profileDTO = modelMapper.map(profile, ProfileResponse.class);
            return ResponseEntity.ok(profileDTO);
        } catch (ProfileException ex) {
            return ResponseEntity.badRequest().body(new MessageResponse(ex.getMessage()));
        } catch (NullPointerException ex) {
            return ResponseEntity.badRequest().body(new MessageResponse("you must enter all values"));
        }
    }
}
