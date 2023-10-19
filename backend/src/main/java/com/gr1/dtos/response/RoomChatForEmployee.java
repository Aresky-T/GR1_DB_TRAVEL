package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RoomChatForEmployee {
    private Integer id;
    private Object customer;
    private List<ChatResponse> chatList;

    @Data
    @NoArgsConstructor
    public static class CustomerDTO {
        private Integer id;
        private String status;
        private String type;
        private String fullName;
        private String email;
        private AccountDTO account;

        @Data
        @NoArgsConstructor
        private static class AccountDTO {
            private Integer id;
            private String email;
        }
    }
}
