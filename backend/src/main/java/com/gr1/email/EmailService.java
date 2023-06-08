package com.gr1.email;

import com.gr1.entity.Account;
import com.gr1.service.IAccountService;
import com.gr1.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class EmailService implements IEmailService{

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void sendEmail (String recipient, String subject, String text) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipient);
        mailMessage.setSubject(subject);
        mailMessage.setText(text);
        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendForgotPasswordEmail (String email) {
        Account account = accountService.findByEmail(email);
        // Format time
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        formatter.withZone(ZoneId.of("Asia/Ho_Chi_Minh"));
        String formattedDateTime = formatter.format(now);
        // Random password
        String passwordRandom = PasswordUtils.randomSecurePassword(10);
        account.setPassword(passwordEncoder.encode(passwordRandom));
        // Save new random password
        accountService.saveOrUpdate(account);
        // Send email
        sendEmail(
                email,
                "Đặt lại mật khẩu",
                "Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình lúc " + formattedDateTime +".\n\n" +
                        "Mật khẩu mới của bạn là: " + passwordRandom + "\n\n" +
                        "Vui lòng quay lại trang đăng nhập và đổi lại mật khẩu để đảm bảo an toàn cho bạn:\n"
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
}
