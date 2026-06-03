package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.dto.ApiResponse;
import nlu.fit.dptemple.dto.ForgetPasswordRequest;
import nlu.fit.dptemple.dto.LoginRequest;
import nlu.fit.dptemple.dto.LoginResponse;
import nlu.fit.dptemple.dto.RegisterRequest;
import nlu.fit.dptemple.dto.ResetPasswordRequest;
import nlu.fit.dptemple.dto.UserProfileUpdateRequest;
import nlu.fit.dptemple.dto.UserResponse;
import nlu.fit.dptemple.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "APIs for user authentication")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    @Operation(summary = "User login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.authenticate(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/register")
    @Operation(summary = "User registration")
    public ResponseEntity<ApiResponse<LoginResponse>> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = userService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
    }

    @PostMapping("/forget-password")
    @Operation(summary = "Request password reset")
    public ResponseEntity<ApiResponse<Void>> forgetPassword(@Valid @RequestBody ForgetPasswordRequest request) {
        userService.forgetPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password reset token sent to your email", null));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset password with token")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password reset successful", null));
    }

    @PostMapping("/verify-email")
    @Operation(summary = "Verify email with token")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestParam String token) {
        userService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully", null));
    }

    @PostMapping("/resend-verification")
    @Operation(summary = "Resend verification email")
    public ResponseEntity<ApiResponse<Void>> resendVerificationEmail(@RequestParam String email) {
        userService.resendVerificationEmail(email);
        return ResponseEntity.ok(ApiResponse.success("Verification email sent", null));
    }

    @PutMapping("/profile/{id}")
    @Operation(summary = "Update user profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(@PathVariable String id, @Valid @RequestBody UserProfileUpdateRequest request) {
        UserResponse updated = userService.updateUserProfile(id, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
