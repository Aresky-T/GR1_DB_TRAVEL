package com.gr1.service;

import com.gr1.dtos.request.ProfileUpdate;
import com.gr1.entity.Account;
import com.gr1.entity.Profile;

import java.util.Map;

public interface IProfileService {
    Profile findByAccount (Account account);
    void addProfile(Account account);
    Profile updateProfile(ProfileUpdate form, Account account);
    void updateProfileByFields (Profile profile, Map<String, Object> fields);
    void updateAvatar (Account account, String newAvatar);
}
