package com.gr1.service_imp;

import com.gr1.dtos.response.*;
import com.gr1.entity.*;
import com.gr1.repository.CustomerSupportRepository;
import com.gr1.service.ICustomerService;
import com.gr1.service.ICustomerSupportService;
import com.gr1.service.IEmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CustomerSupportService implements ICustomerSupportService {

    @Autowired
    private CustomerSupportRepository csRepository;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CustomerSupport connect (GuestCustomer customer) {
        if(employeeService.existsOnlineEmployee()){
            Employee onlineEmp = employeeService.findByStatus(EEmployeeStatus.ONLINE);
            if(customerService.isExistsByEmail(customer.getEmail())){
                GuestCustomer customer1 = customerService.findByEmail(customer.getEmail());
                customer1.setFullName(customer.getFullName());
                Customer customer2 = customerService.save(customer1);
                return csRepository.findByCustomerIsAndEmployeeIs(
                        customer2,
                        onlineEmp
                );
            } else {
                Customer newCustomer = customerService.save(customer);
                CustomerSupport cs = new CustomerSupport();
                cs.setCustomer(newCustomer);
                cs.setEmployee(onlineEmp);
                cs.setType(ECustomerSupportType.CHAT);
                return csRepository.save(cs);
            }
        }
        return null;
    }

    @Override
    public CustomerSupport connect (Account account) {
        if(employeeService.existsOnlineEmployee()){
            Employee onlineEmp = employeeService.findByStatus(EEmployeeStatus.ONLINE);
            if(customerService.isExistsByAccount(account)){
                Customer registeredCustomer = customerService.findByAccount(account);
                return csRepository.findByCustomerIsAndEmployeeIs(
                        registeredCustomer,
                        onlineEmp
                );
            } else {
                RegisteredCustomer newCustomer = new RegisteredCustomer();
                newCustomer.setStatus(ECustomerStatus.ONLINE);
                newCustomer.setType(ECustomerType.REGISTERED);
                newCustomer.setAccount(account);
                Customer registeredCustomer = customerService.save(newCustomer);
                CustomerSupport cs = new CustomerSupport();
                cs.setCustomer(registeredCustomer);
                cs.setEmployee(onlineEmp);
                cs.setType(ECustomerSupportType.CHAT);
                return csRepository.save(cs);
            }
        }
        return null;
    }

    @Override
    public void deleteById (int customerSupportId) {
        CustomerSupport room = findById(customerSupportId);
        if(Objects.nonNull(room)){
            csRepository.deleteById(customerSupportId);
        }
    }

    @Override
    public CustomerSupport findById (int customerSupportId) {
        return csRepository.findById(customerSupportId).orElse(null);
    }

    @Override
    public RoomChatForEmployee convertToDto (CustomerSupport entity) {
        RoomChatForEmployee dto = new RoomChatForEmployee();
        dto.setId(entity.getId());
        dto.setChatList(modelMapper.map(entity.getChatList(), new TypeToken<List<ChatResponse>>(){}.getType()));
        if(entity.getCustomer().getType() == ECustomerType.GUEST){
            dto.setCustomer(new GuestCustomerDTO((GuestCustomer) entity.getCustomer()));
        } else if(entity.getCustomer().getType() == ECustomerType.REGISTERED) {
            dto.setCustomer(new RegisteredCustomerDTO((RegisteredCustomer) entity.getCustomer()));
        }
        return dto;
    }

    @Override
    public List<CustomerSupport> getRoomsByEmployeeId (int employeeId) {
        return csRepository.findAllByEmployee_Id(employeeId);
    }

    @Override
    public List<RoomChatForEmployee> convertToDtos (List<CustomerSupport> entities) {
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }
}
