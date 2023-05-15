package com.gr1.dtos.response;

import lombok.Data;

@Data
public class JwtResponse {
    private Integer id;
    private String token;
    private String type = "Bearer";
    private String username;
    private String email;
    private String role;
    private String status;

    public JwtResponse (Integer id, String token, String username, String email, String role, String status) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.email = email;
        this.role = role;
        this.status = status;
    }
}
