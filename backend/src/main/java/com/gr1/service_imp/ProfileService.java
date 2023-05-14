package com.gr1.service_imp;

import com.gr1.entity.Account;
import com.gr1.entity.Profile;
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
    public Optional<Profile> findByAccountId (int accountId) {
        boolean accExists = profileRepository.existsById(accountId);
        if (accExists) {
            var acc = accountRepository.findById(accountId).get();
            boolean profileExists = profileRepository.existsByAccount(acc);

            if (profileExists) {
                return profileRepository.findByAccount(acc);
            }
        }
        return Optional.empty();
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
    public void createOrUpdateProfile (Profile profile, String username) throws Exception {
        try {
            System.out.println(profile.toString());
            var acc = accountRepository.findByUsername(username);
            if(existsByAccountId(acc.get().getId())){
                profileRepository.save(profile);
            }
        } catch (Exception e) {
            throw new Exception("Create or update profile failed");
        }
    }

    @Override
    public Optional<Profile> findByAccountUsername(String username) {
        if(accountRepository.existsByUsername(username)){
            Account account = accountRepository.findByUsername(username).get();
            return profileRepository.findByAccount(account);
        }

        return Optional.empty();
    }
}
