package com.gr1.service_imp;

import com.gr1.compare.MailComparator;
import com.gr1.dtos.response.CustomerDTO;
import com.gr1.dtos.response.MailBoxForEmployee;
import com.gr1.dtos.response.MailResponse;
import com.gr1.entity.*;
import com.gr1.repository.AccountRepository;
import com.gr1.repository.CustomerRepository;
import com.gr1.repository.MailBoxRepository;
import com.gr1.repository.MailRepository;
import com.gr1.service.IEmployeeService;
import com.gr1.service.IMailBoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class MailBoxService implements IMailBoxService {

    @Autowired
    private MailBoxRepository mailBoxRepository;
    @Autowired
    private MailRepository mailRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private IEmployeeService employeeService;

    @Override
    public List<MailBox> findAllByEmployee (Employee employee) {
        return mailBoxRepository.findAllByEmployeeIs(employee)
                .stream()
                .map(this::setLatestMail)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public MailBox connect (String fullName, String email) {
        Employee employee = employeeService.findById(1);
        if(employee != null){
            Customer customer = customerRepository.findByEmail(email)
                    .orElseGet(() -> customerRepository.save(new Customer(fullName, email)));
            accountRepository.findByEmail(email).ifPresent(customer::setAccount);
            customer.setFullName(fullName);
            return connect(customer, employee);
        }
        return null;
    }

    private MailBox connect(Customer customer, Employee employee){
        if(Boolean.TRUE.equals(mailBoxRepository.existsByCustomerIsAndEmployeeIs(customer, employee))){
            MailBox mailBox = mailBoxRepository.findByCustomerIsAndEmployeeIs(customer, employee);
            return setLatestMail(mailBox);
//            return mailBoxRepository.findByCustomerIsAndEmployeeIs(customer, employee);
        } else {
            return mailBoxRepository.save(new MailBox(customer, employee));
        }
    }

    @Override
    public MailBox findById (int mailBoxId) {
        Optional<MailBox> optional = mailBoxRepository.findById(mailBoxId);
        return optional.map(this::setLatestMail).orElse(null);
        //        return mailBoxRepository.findById(mailBoxId).orElse(null);
    }

    @Transactional
    @Override
    public boolean deleteById (int mailBoxId) {
        AtomicBoolean isDeleted = new AtomicBoolean(false);
        mailBoxRepository.findById(mailBoxId).ifPresent(mb -> {
            mailBoxRepository.delete(mb);
            isDeleted.set(true);
        });
        return isDeleted.get();
    }

    @Override
    public MailBoxForEmployee convertToMailBoxForEmployee (MailBox mailBox) {
        MailBoxForEmployee dto = new MailBoxForEmployee();
        dto.setId(mailBox.getId());
        dto.setCustomer(new CustomerDTO(mailBox.getCustomer()));

        List<Mail> mails = mailBox.getMailList();
        if (!mails.isEmpty()){
            mails.sort(new MailComparator());
            dto.setUnrepliedEmailsCount(getUnrepliedEmailsCount(mails));
            dto.setMailList(mails.stream().map(MailResponse::new).collect(Collectors.toList()));

            // Get latest mail
            Mail latestMail = mails.get(0);
            dto.setLatestMail(new MailBoxForEmployee.MailDTO(latestMail));
        } else {
            dto.setUnrepliedEmailsCount(0);
            dto.setMailList(new ArrayList<>());
            dto.setLatestMail(null);
        }
        return dto;
    }

    public MailBox setLatestMail(MailBox mailBox){
        mailBox.setLatestMail(mailRepository.findLatestMailByMailBox(mailBox.getId()).orElse(null));
        return mailBox;
    }

    public int getUnrepliedEmailsCount(List<Mail> mails){
        AtomicInteger count = new AtomicInteger(0);
        mails.forEach(m -> {
            if(m.getMailReply().isEmpty()){
                count.getAndIncrement();
            }
        });
        return count.get();
    }
}
