package com.gr1.dtos.response;

import com.gr1.entity.ECustomerStatus;
import com.gr1.entity.ECustomerType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RoomChatForCustomer {
    private Integer id;
    private CustomerDTO customer;
    private EmployeeDTO employee;
    private List<ChatResponse> chatList;

    @Data
    @NoArgsConstructor
    public static class CustomerDTO {
        private Integer id;
        private ECustomerStatus status;
        private ECustomerType type;
    }

    @Data
    @NoArgsConstructor
    public static class EmployeeDTO {
        private Integer id;
        private String status;
    }
}
