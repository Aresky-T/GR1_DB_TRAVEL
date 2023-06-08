package com.gr1.service;

import com.gr1.dtos.request.ProfileUpdate;
import com.gr1.entity.Account;
import com.gr1.entity.Profile;
import com.gr1.exception.ProfileException;

import java.util.Map;
import java.util.Optional;

public interface IProfileService {
    Optional<Profile> findByAccount(Account account);
    Profile findByAccountUsername(String username);
    Boolean existsByAccountId(int accountId);
    void addProfile(String username) throws ProfileException;
    Profile updateProfile(ProfileUpdate form, String username) throws ProfileException;
    void updateProfileByFields (Profile profile, Map<String, Object> fields);
}
