package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.dto.ForgetPasswordRequest;
import nlu.fit.dptemple.dto.LoginRequest;
import nlu.fit.dptemple.dto.LoginResponse;
import nlu.fit.dptemple.dto.RegisterRequest;
import nlu.fit.dptemple.dto.ResetPasswordRequest;
import nlu.fit.dptemple.dto.UserProfileUpdateRequest;
import nlu.fit.dptemple.dto.UserRequest;
import nlu.fit.dptemple.dto.UserResponse;
import nlu.fit.dptemple.entity.Role;
import nlu.fit.dptemple.entity.User;
import nlu.fit.dptemple.exception.DuplicateResourceException;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.mapper.UserMapper;
import nlu.fit.dptemple.repository.UserRepository;
import nlu.fit.dptemple.security.JwtTokenProvider;
import nlu.fit.dptemple.service.EmailService;
import nlu.fit.dptemple.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;

    private final Map<String, String> resetTokens = new HashMap<>();

    @Override
    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        }
        User user = userMapper.toEntity(request);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        User saved = userRepository.save(user);
        return userMapper.toResponse(saved);
    }

    @Override
    public UserResponse updateUser(String id, UserRequest request) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        if (!existing.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        }
        userMapper.updateEntityFromRequest(request, existing);
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            existing.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }
        User saved = userRepository.save(existing);
        return userMapper.toResponse(saved);
    }

    @Override
    public UserResponse updateUserProfile(String id, UserProfileUpdateRequest request) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        if (request.getFullName() != null) {
            existing.setFullName(request.getFullName());
        }
        if (request.getDharmaName() != null) {
            existing.setDharmaName(request.getDharmaName());
        }
        if (request.getPhone() != null) {
            existing.setPhone(request.getPhone());
        }
        if (request.getAddress() != null) {
            existing.setAddress(request.getAddress());
        }

        User saved = userRepository.save(existing);
        return userMapper.toResponse(saved);
    }

    @Override
    public void deleteUser(String id, String deletedById) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        User deletedBy = userRepository.findById(deletedById).orElse(null);
        user.setDeletedBy(deletedBy);
        user.setDeletedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse findById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return userMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return userMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> findAllActive(Pageable pageable) {
        return userRepository.findByIsActiveTrueAndDeletedAtIsNull(pageable)
                .map(userMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> findAllDeleted(Pageable pageable) {
        return userRepository.findByDeletedAtIsNotNull(pageable)
                .map(userMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public LoginResponse authenticate(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResourceNotFoundException("User", "credentials", "Invalid email or password");
        }

        if (Boolean.FALSE.equals(user.getIsActive())) {
            throw new ResourceNotFoundException("User", "status", "Account is inactive");
        }

        if (user.getDeletedAt() != null) {
            throw new ResourceNotFoundException("User", "status", "Account has been deleted");
        }

        String token = tokenProvider.generateTokenFromUserId(user.getId(), user.getEmail(), user.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .id(user.getId())
                .fullName(user.getFullName())
                .dharmaName(user.getDharmaName())
                .email(user.getEmail())
                .role(user.getRole())
                .avatarUrl(user.getAvatarUrl())
                .loginTime(LocalDateTime.now())
                .build();
    }

    @Override
    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setDharmaName(request.getDharmaName());
        user.setPhone(request.getPhone());
        user.setOccupation(request.getOccupation());
        user.setAddress(request.getAddress());
        user.setRole(Role.user);
        user.setIsActive(true);
        user.setEmailVerified(false);

        String verificationToken = UUID.randomUUID().toString();
        user.setEmailVerificationToken(verificationToken);
        user.setEmailVerificationTokenExpiry(LocalDateTime.now().plusHours(24));

        User saved = userRepository.save(user);

        emailService.sendVerificationEmail(saved.getEmail(), verificationToken);

        String token = tokenProvider.generateTokenFromUserId(saved.getId(), saved.getEmail(), saved.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .id(saved.getId())
                .fullName(saved.getFullName())
                .dharmaName(saved.getDharmaName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .avatarUrl(saved.getAvatarUrl())
                .loginTime(LocalDateTime.now())
                .build();
    }

    @Override
    public void forgetPassword(ForgetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        String resetToken = UUID.randomUUID().toString();
        resetTokens.put(resetToken, user.getEmail());

        System.out.println("Password reset token for " + user.getEmail() + ": " + resetToken);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        String email = resetTokens.get(request.getToken());
        if (email == null) {
            throw new ResourceNotFoundException("Reset token", "token", "Invalid or expired token");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetTokens.remove(request.getToken());
    }

    @Override
    public void verifyEmail(String token) {
        User user = userRepository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Verification token", "token", "Invalid or expired token"));

        if (user.getEmailVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new ResourceNotFoundException("Verification token", "token", "Token has expired");
        }

        user.setEmailVerified(true);
        user.setEmailVerificationToken(null);
        user.setEmailVerificationTokenExpiry(null);
        userRepository.save(user);
    }

    @Override
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new ResourceNotFoundException("Email is already verified");
        }

        String verificationToken = UUID.randomUUID().toString();
        user.setEmailVerificationToken(verificationToken);
        user.setEmailVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), verificationToken);
    }
}
