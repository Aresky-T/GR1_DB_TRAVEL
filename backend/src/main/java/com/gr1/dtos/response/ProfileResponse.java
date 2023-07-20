package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProfileResponse {
    private Integer id;
    private String avatarUrl;
    private String fullName;
    private String address;
    private String phone;
    private String dateOfBirth;
    private String gender;
    private AccountDTO account;

    @Data
    @NoArgsConstructor
    public static class AccountDTO {
        private String username;
        private String email;
    }
}
