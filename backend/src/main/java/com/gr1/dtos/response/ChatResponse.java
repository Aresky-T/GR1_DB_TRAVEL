package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatResponse {
    private Integer id;
    private String message;
    private String sender;
    private String status;
    private String sentAt;
}
