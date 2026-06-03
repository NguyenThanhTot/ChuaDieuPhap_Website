package nlu.fit.dptemple.service;

import nlu.fit.dptemple.dto.ForgetPasswordRequest;
import nlu.fit.dptemple.dto.LoginRequest;
import nlu.fit.dptemple.dto.LoginResponse;
import nlu.fit.dptemple.dto.RegisterRequest;
import nlu.fit.dptemple.dto.ResetPasswordRequest;
import nlu.fit.dptemple.dto.UserProfileUpdateRequest;
import nlu.fit.dptemple.dto.UserRequest;
import nlu.fit.dptemple.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserResponse createUser(UserRequest request);

    UserResponse updateUser(String id, UserRequest request);

    UserResponse updateUserProfile(String id, UserProfileUpdateRequest request);

    void deleteUser(String id, String deletedById);

    UserResponse findById(String id);

    UserResponse findByEmail(String email);

    Page<UserResponse> findAllActive(Pageable pageable);

    Page<UserResponse> findAllDeleted(Pageable pageable);

    boolean existsByEmail(String email);

    LoginResponse authenticate(LoginRequest request);

    LoginResponse register(RegisterRequest request);

    void forgetPassword(ForgetPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

    void verifyEmail(String token);

    void resendVerificationEmail(String email);
}
