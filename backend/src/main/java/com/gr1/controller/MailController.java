package com.gr1.controller;

import com.gr1.compare.MailBoxComparator;
import com.gr1.dtos.request.MailForm;
import com.gr1.dtos.request.MailFormForEmployee;
import com.gr1.dtos.response.MailBoxForCustomer;
import com.gr1.dtos.response.MailBoxForEmployee;
import com.gr1.dtos.response.MailResponse;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.entity.*;
import com.gr1.service.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/mail")
public class MailController {

    @Autowired
    private IMailBoxService mailBoxService;
    @Autowired
    private IMailService mailService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IMailReplyService mailReplyService;
    @Autowired
    private IThymeleafService thymeleafService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMailToEmployee(@RequestBody MailForm form){
        Mail mail = form.buildMail();
        MailBox mailBox = mailBoxService.connect(form.getFullName(), form.getEmail());
        if(Objects.nonNull(mailBox)){
            mail.setMailBox(mailBox);
            mailService.save(mail);

//            Map<String, Object> variables = new HashMap<>();
//            variables.put("mailContent", form.getContent());
//            String template = thymeleafService.createContent("", variables);
//            mailService.sendEmailWithHtmlTemplate(form.getEmail(), form.getTitle(), template);
            return ResponseEntity.ok(new MailBoxForCustomer(mailBox));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("failed"));
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @PostMapping("/send-to-customer")
    public ResponseEntity<?> sendMailToCustomer(@RequestBody MailFormForEmployee form){
        // Set mail reply
        MailReply mailReply = form.buildMailReply();
        Integer originalMailId = form.getOriginalMail();
        // Get mail info
        String recipient = form.getRecipient();
        String subject = form.getTitle();
        String content = form.getContent();

        // Handle validate original mail and send mail to customer if mail is valid
        Mail mail = mailService.findById(originalMailId);
        if(Objects.nonNull(mail)){
            mailReply.setOriginalMail(mail);
            mailReplyService.save(mailReply);

            // Handle string content
            Document doc = Jsoup.parse(content);
            String parsedHtml = doc.html();
            Map<String, Object> variables = new HashMap<>();
            variables.put("mailContent", parsedHtml);
            String template = thymeleafService.createContent("mail-sender-for-employee.html", variables);
            mailService.sendEmailWithHtmlTemplate(recipient, subject, template);
            return ResponseEntity.ok(new MessageResponse("success"));
        }
        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/mail-box/get-all")
    public ResponseEntity<?> getAllMailBoxForEmployee(Authentication authentication){
        List<MailBox> mailBoxes = null;
        List<MailBoxForEmployee> dtos = null;
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        Employee employee = employeeService.findByAccount(account);
        if(Objects.nonNull(employee)){
            mailBoxes = mailBoxService.findAllByEmployee(employee);
            if(mailBoxes.isEmpty()){
                dtos = new ArrayList<>();
            } else {
                mailBoxes.sort(new MailBoxComparator());
                dtos = mailBoxes.stream().map(mailBox -> mailBoxService.convertToMailBoxForEmployee(mailBox)).collect(Collectors.toList());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("!Employee does not exists"));
        }

        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/mail-box/{id}")
    public ResponseEntity<?> getMailBoxById(@PathVariable int id){
        MailBox mailBox = mailBoxService.findById(id);
        if(Objects.isNull(mailBox)){
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid mail_box id"));
        }
        return ResponseEntity.ok(mailBoxService.convertToMailBoxForEmployee(mailBox));
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/details/{mailId}")
    public ResponseEntity<?> getMailById(@PathVariable int mailId){
        Mail mail = mailService.findById(mailId);
        if(Objects.nonNull(mail)){
            return  ResponseEntity.ok(new MailResponse(mail));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Invalid mailId"));
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @DeleteMapping("/mail-box/{id}")
    public ResponseEntity<?> deleteMailBox(@PathVariable int id){
        boolean isDeleted = mailBoxService.deleteById(id);
        return ResponseEntity.ok(isDeleted);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @DeleteMapping("/{mailId}")
    public ResponseEntity<Boolean> deleteMail(@PathVariable int mailId){
        boolean isDeleted = mailService.deleteById(mailId);
        return ResponseEntity.ok(isDeleted);
    }
}
