package com.gr1.controller;

import java.util.Optional;

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
        int accountId = account.getId();

        Optional<Profile> result = profileService.findByAccountId(accountId);

        if (result.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No profile for account_id = " + accountId));
        }

        var profile = result.get();

        if (profile.getAvatarUrl() == null || profile.getDateOfBirth() == null || profile.getFullName() == null
                || profile.getGender() == null || profile.getPhone() == null) {
            return ResponseEntity.ok("Please update your profile");
        }

        ProfileResponse profileDTO = modelMapper.map(profile, ProfileResponse.class);

        return ResponseEntity.ok(profileDTO);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody ProfileUpdate form, Authentication authentication) throws Exception {
        String username = authentication.getName();
        Optional<Profile> result = profileService.findByAccountUsername(username);
        if (result.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("profile is not exists"));
        }
        Profile profile = result.get();
        profile.setAvatarUrl(form.getAvatarUrl());
        profile.setFullName(form.getFullName());
        profile.setAddress(form.getAddress());
        profile.setPhone(form.getPhone());
        profile.setDateOfBirth(form.getDateOfBirth());

        if (form.getGender() != null) {
            switch (form.getGender()) {
                case "MALE":
                    profile.setGender(EGender.MALE);
                    break;
                case "FEMALE":
                    profile.setGender(EGender.FEMALE);
                    break;
                default:
            }
        }

        profileService.createOrUpdateProfile(profile, username);
        return ResponseEntity.ok("update profile success");
    }
}
