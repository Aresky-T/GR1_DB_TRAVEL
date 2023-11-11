package com.gr1.service_imp;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import com.gr1.entity.Account;
import com.gr1.entity.MailBox;
import com.gr1.service.IAccountService;
import com.gr1.service.IThymeleafService;
import com.gr1.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gr1.entity.CustomerSupport;
import com.gr1.entity.Mail;
import com.gr1.repository.MailRepository;
import com.gr1.service.IMailService;

@Service
public class MailService implements IMailService {

    @Autowired
    private MailRepository mailRepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IThymeleafService thymeleafService;

    @Value("${spring.mail.username}")
    private String email;

    private final String FORGOT_PASSWORD_TEMPLATE_FILE_NAME = "mail-sender-for-forgot-password.html";
    private final String MAIL_SENDER_FOR_EMPLOYEE_FILE_NAME = "mail-sender-for-employee.html";

    @Transactional
    @Override
    public Mail save (Mail mail) {
        return mailRepository.save(mail);
    }

    @Override
    public Mail findById (int id) {
        return mailRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteById (int id) {
        AtomicBoolean result = new AtomicBoolean(false);
        mailRepository.findById(id).ifPresent(mail -> {
            mailRepository.delete(mail);
            result.set(true);
        });
        return result.get();
    }

    @Override
    public List<Mail> findAllByMailBox (MailBox mailBox) {
        return mailRepository.findAllByMailBoxOrderBySentAtDesc(mailBox);
    }

    @Override
    public void sendEmail (String recipient, String subject, String text) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipient);
        mailMessage.setSubject(subject);
        mailMessage.setText(text);
        mailMessage.setSentDate(new Date());
        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendForgotPasswordEmail (String recipient) throws MessagingException {
        Account account = accountService.findByEmail(recipient);
        // Format time
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        String now = dateFormat.format(new Date(System.currentTimeMillis()));

        // Random password
        String newPasswordRandom = PasswordUtils.randomSecurePassword(10);
        account.setPassword(passwordEncoder.encode(newPasswordRandom));
        accountService.saveOrUpdate(account);

        // Add variable to context thymeleaf
        Map<String, Object> variables = new HashMap<>();
        variables.put("requiredForgotPasswordTime", now);
        variables.put("newPasswordRandom", newPasswordRandom);
        // Send email
        String template = thymeleafService.createContent(FORGOT_PASSWORD_TEMPLATE_FILE_NAME, variables);
        sendEmailWithHtmlTemplate(
                recipient,
                "BK TRAVEL - Yêu cầu đặt lại mật khẩu",
                template
        );
    }

    @Override
    public void sendEmailToAcceptAnRequestFromUser (String email, Date requestTime) {
        sendEmail(
                email,
                "BK Travel: Xác nhận hủy tour đã đặt",
                "Bạn đã gửi yêu cầu hủy tour đã đặt vào lúc " + requestTime.toString() + ".\n\n" +
                        "Hệ thống đã xác nhận và hủy bỏ yêu cầu thành công, cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!"
        );
    }

    @Override
    public void sendEmailWithHtmlTemplate(String recipient, String subject, String template){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");
            messageHelper.setTo(recipient);
            messageHelper.setFrom(email);
            messageHelper.setSubject(subject);
            messageHelper.setText(template, true);
            javaMailSender.send(message);
        } catch (MessagingException e){
            e.printStackTrace();
        }
    }
}
