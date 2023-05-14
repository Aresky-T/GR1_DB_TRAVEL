package com.gr1.repository;

import com.gr1.entity.Account;
import com.gr1.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Optional<Profile> findByAccount(Account account);
    boolean existsByAccount(Account account);
}
