package nlu.fit.dptemple.service;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
    
    void sendResetPasswordEmail(String to, String token);
}
