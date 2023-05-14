package com.gr1.dtos.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpForm {
    private String username;
    private String password;
    private String email;
}
