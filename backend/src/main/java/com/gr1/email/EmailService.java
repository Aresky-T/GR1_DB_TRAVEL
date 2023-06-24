package com.gr1.email;

import com.gr1.entity.Account;
import com.gr1.service.IAccountService;
import com.gr1.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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
        mailMessage.setSentDate(new Date());
        javaMailSender.send(mailMessage);
    }

    public void sendEmailWithHtmlContent (String recipient, String subject, String text) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(recipient);
        helper.setSubject(subject);
        helper.setText(text, true);
        helper.setFrom("gr1projectmailhust@gmail.com");
        javaMailSender.send(message);
    }

    @Override
    public void sendForgotPasswordEmail (String email) throws MessagingException {
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
//        sendEmail(
//                email,
//                "Đặt lại mật khẩu",
//                "Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình lúc " + formattedDateTime +".\n\n" +
//                        "Mật khẩu mới của bạn là: " + passwordRandom + "\n\n" +
//                        "Vui lòng quay lại trang đăng nhập và đổi lại mật khẩu để đảm bảo an toàn cho bạn:\n"
//        );
        sendEmailWithHtmlContent(
                email,
                "Đặt lại mật khẩu",
                "<html>\n" +
                        "\n" +
                        "<body>\n" +
                        "    <h1>Yêu cầu lấy lại mật khẩu!</h1>\n" +
                        "    <p class=\"text-message\">\n" +
                        "        Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình lúc\n" +
                        "        <span style=\"font-weight: 600;\">\n" + formattedDateTime +
                        "        </span>\n" +
                        "        <br />\n" +
                        "        Mật khẩu mới của bạn là:\n" +
                        "        <span style=\"font-weight: 600;\">\n" + passwordRandom +
                        "        </span><br />Vui lòng quay lại trang đăng nhập và đổi lại mật khẩu để đảm bảo an toàn cho bạn!\n" +
                        "    </p>\n" +
                        "    <p><a href=\"http://localhost:3000/login\">\n" +
                        "            <button style=\"background-color: #4CAF50; color: white; padding: 10px 20px;\n" +
                        "                text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; border: none;\n" +
                        "                cursor: pointer;\">\n" +
                        "                Quay lại đăng nhập\n" +
                        "            </button></a></p>\n" +
                        "</body>\n" +
                        "\n" +
                        "</html>"
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
