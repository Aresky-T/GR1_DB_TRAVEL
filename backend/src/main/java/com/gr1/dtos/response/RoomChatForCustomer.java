package com.gr1.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.gr1.entity.Employee;

@Data
@NoArgsConstructor
public class RoomChatForCustomer {
    private Integer id;
    private CustomerDTO customer;
    private EmployeeDTO employee;
    private List<ChatResponse> chatList;
    
    @Data
    @NoArgsConstructor
    public static class EmployeeDTO{
    	private Integer id;
    	private String status;

    	public EmployeeDTO(Employee employee) {
    		this.id = employee.getId();
    		this.status = employee.getStatus().toString();
    	}
    }
}
