package com.gr1.service_imp;

import com.gr1.dtos.request.ProfileUpdate;
import com.gr1.entity.Account;
import com.gr1.entity.EGender;
import com.gr1.entity.Profile;
import com.gr1.exception.ProfileException;
import com.gr1.repository.AccountRepository;
import com.gr1.repository.ProfileRepository;
import com.gr1.service.IProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService implements IProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Optional<Profile> findByAccount (Account account) {
        return profileRepository.findByAccount(account);
    }

    @Override
    public Boolean existsByAccountId (int accountId) {
        boolean accountExists = accountRepository.existsById(accountId);
        if (accountExists) {
            var acc = accountRepository.findById(accountId);
            return profileRepository.existsByAccount(acc.get());
        }
        return false;
    }

    @Override
    public Optional<Profile> findByAccountUsername(String username) {
        if(Boolean.TRUE.equals(accountRepository.existsByUsername(username))){
            Account account = accountRepository.findByUsername(username).get();
            return profileRepository.findByAccount(account);
        }

        return Optional.empty();
    }

    @Override
    public void addProfile(String username) throws ProfileException {
        Profile profile = new Profile();
        Optional<Account> optional = accountRepository.findByUsername(username);
        if (optional.isPresent()){
            Account account = optional.get();
            profile.setAccount(account);
            profileRepository.save(profile);
        } else {
            throw new ProfileException("username is not exists");
        }
    }

    @Override
    public Profile updateProfile (ProfileUpdate form, String username) throws ProfileException {
        Optional<Account> optional = accountRepository.findByUsername(username);
        if (optional.isPresent()){
            Account account = optional.get();
            Optional<Profile> optionalProfile = profileRepository.findByAccount(account);
            if(optionalProfile.isPresent()){
                Profile profile = optionalProfile.get();
                profile.setAddress(form.getAddress());
                profile.setAvatarUrl(form.getAvatarUrl());
                profile.setPhone(form.getPhone());
                profile.setFullName(form.getFullName());
                profile.setDateOfBirth(form.getDateOfBirth());
                setGenderProfile(profile, form.getGender());
                return profileRepository.save(profile);
            } else {
                throw new ProfileException("Profile is not exist");
            }
        } else {
            throw new ProfileException("Invalid username");
        }
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
