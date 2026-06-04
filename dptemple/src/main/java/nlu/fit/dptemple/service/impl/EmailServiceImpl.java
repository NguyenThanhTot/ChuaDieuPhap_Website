package nlu.fit.dptemple.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nlu.fit.dptemple.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendVerificationEmail(String to, String token) {
        try {
            String verificationUrl = frontendUrl + "/verify-email?token=" + token;
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Verify Your Email Address");
            
            String emailContent = buildVerificationEmailContent(to, verificationUrl);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Verification email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send verification email to: {}", to, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    @Override
    public void sendResetPasswordEmail(String to, String token) {
        try {
            String resetUrl = frontendUrl + "/reset-password?token=" + token;
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Reset Your Password");
            
            String emailContent = buildResetPasswordEmailContent(to, resetUrl);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Reset password email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send reset password email to: {}", to, e);
            throw new RuntimeException("Failed to send reset password email", e);
        }
    }

    private String buildVerificationEmailContent(String to, String verificationUrl) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Verify Your Email Address</h2>
                    <p>Hi,</p>
                    <p>Thank you for registering! Please click the button below to verify your email address:</p>
                    <p>
                        <a href="%s" 
                           style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
                            Verify Email
                        </a>
                    </p>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #666;">%s</p>
                    <p>This link will expire in 24 hours.</p>
                    <p>If you didn't create an account, please ignore this email.</p>
                    <p>Best regards,<br>Temple Team</p>
                </div>
            </body>
            </html>
            """.formatted(verificationUrl, verificationUrl);
    }

    private String buildResetPasswordEmailContent(String to, String resetUrl) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p>Hi,</p>
                    <p>We received a request to reset your password. Please click the button below to reset your password:</p>
                    <p>
                        <a href="%s" 
                           style="display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 4px;">
                            Reset Password
                        </a>
                    </p>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #666;">%s</p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
                    <p>Best regards,<br>Temple Team</p>
                </div>
            </body>
            </html>
            """.formatted(resetUrl, resetUrl);
    }
}
