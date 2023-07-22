package com.gr1.service_imp;

import com.gr1.dtos.request.ProfileUpdate;
import com.gr1.entity.Account;
import com.gr1.entity.EGender;
import com.gr1.entity.Profile;
import com.gr1.exception.CustomException;
import com.gr1.exception.ProfileException;
import com.gr1.repository.ProfileRepository;
import com.gr1.service.IAccountService;
import com.gr1.service.IProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.*;

@Service
public class ProfileService implements IProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private IAccountService accountService;

    @Override
    public Profile findByAccount (Account account) {
        Optional<Profile> optional = profileRepository.findByAccount(account);
        if(optional.isEmpty()) {
            throw new ProfileException("Profile not found by accountId = " + account.getId());
        }
        return optional.get();
    }

    @Override
    public void addProfile(Account account) {
        Optional<Profile> optional = profileRepository.findByAccount(account);
        if (optional.isEmpty()){
            Profile profile = new Profile();
            profile.setAccount(account);
            profileRepository.save(profile);
        }
    }

    @Override
    public Profile updateProfile (ProfileUpdate form, Account account) throws ProfileException {
            Profile profile = findByAccount(account);
            profile.setAddress(form.getAddress());
            profile.setPhone(form.getPhone());
            profile.setFullName(form.getFullName());
            profile.setDateOfBirth(form.getDateOfBirth());
            profile.setGender(form.getGender());
            return profileRepository.save(profile);
    }

    @Override
    public void updateProfileByFields (Profile profile, Map<String, Object> fields) {
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(Profile.class, key);
            if(Objects.isNull(field)){
                throw new CustomException("Field not found: " + "[" + key + "]");
            }

            if(key.equalsIgnoreCase("gender")){
                setGenderProfile(profile, (String) value);
                return;
            }

            ReflectionUtils.makeAccessible(field);
            ReflectionUtils.setField(field, profile, value);
        });
        profileRepository.save(profile);
    }

    @Transactional
    @Override
    public void updateAvatar (Account account, String newAvatar){
        Profile profile = findByAccount(account);
        profile.setAvatarUrl(newAvatar);
        profileRepository.save(profile);
    }

    protected static void setGenderProfile(Profile profile, String gender){
        switch (gender){
            case "MALE":
                profile.setGender(EGender.MALE);
                break;
            case "FEMALE":
                profile.setGender(EGender.FEMALE);
                break;
            default:
                throw new ProfileException("Invalid gender");
        }
    }
}
