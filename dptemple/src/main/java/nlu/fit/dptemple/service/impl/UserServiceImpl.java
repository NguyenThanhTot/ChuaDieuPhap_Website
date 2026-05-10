package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.dto.LoginRequest;
import nlu.fit.dptemple.dto.LoginResponse;
import nlu.fit.dptemple.dto.UserRequest;
import nlu.fit.dptemple.dto.UserResponse;
import nlu.fit.dptemple.entity.User;
import nlu.fit.dptemple.exception.DuplicateResourceException;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.mapper.UserMapper;
import nlu.fit.dptemple.repository.UserRepository;
import nlu.fit.dptemple.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

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

        // Generate a simple token (in production, use JWT)
        String token = UUID.randomUUID().toString();

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
}
