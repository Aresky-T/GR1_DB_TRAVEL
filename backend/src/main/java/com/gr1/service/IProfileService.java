package com.gr1.service;

import com.gr1.entity.Profile;

import java.util.Optional;

public interface IProfileService {
    Optional<Profile> findByAccountId(int accountId);
    Optional<Profile> findByAccountUsername(String username);
    Boolean existsByAccountId(int accountId);
    void createOrUpdateProfile (Profile profile, String username) throws Exception;
}
