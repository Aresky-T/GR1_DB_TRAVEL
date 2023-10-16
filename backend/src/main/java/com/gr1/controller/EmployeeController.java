package com.gr1.controller;

import com.gr1.dtos.response.EmployeeDetails;
import com.gr1.entity.Account;
import com.gr1.entity.Employee;
import com.gr1.entity.Profile;
import com.gr1.service.IAccountService;
import com.gr1.service.IEmployeeService;
import com.gr1.service.IProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@PreAuthorize("hasAuthority('EMPLOYEE')")
@RequestMapping("/api/v1/employee")
public class EmployeeController {

    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IProfileService profileService;

    @GetMapping()
    public ResponseEntity<?> getDetailsEmployee(Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Profile profile = profileService.findByAccount(account);
        Employee employee = employeeService.findByAccount(account);
        EmployeeDetails dto = null;
        if(employee != null){
            dto = EmployeeDetails.builder()
                    .id(employee.getId())
                    .address(profile.getAddress())
                    .gender(profile.getGender())
                    .avatarUrl(profile.getAvatarUrl())
                    .phone(profile.getPhone())
                    .fullName(profile.getFullName())
                    .dateOfBirth(profile.getDateOfBirth())
                    .status(employee.getStatus().toString())
                    .accountId(account.getId())
                    .build();

        }
        return ResponseEntity.ok(dto);
    }
}
