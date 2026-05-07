package nlu.fit.dptemple.mapper;

import nlu.fit.dptemple.dto.UserRequest;
import nlu.fit.dptemple.dto.UserResponse;
import nlu.fit.dptemple.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRequest request) {
        if (request == null) return null;
        User user = new User();
        user.setFullName(request.getFullName());
        user.setDharmaName(request.getDharmaName());
        user.setPhone(request.getPhone());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setOccupation(request.getOccupation());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        return user;
    }

    public void updateEntityFromRequest(UserRequest request, User user) {
        if (request == null || user == null) return;
        user.setFullName(request.getFullName());
        user.setDharmaName(request.getDharmaName());
        user.setPhone(request.getPhone());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setOccupation(request.getOccupation());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setIsActive(request.getIsActive());
    }

    public UserResponse toResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .dharmaName(user.getDharmaName())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .email(user.getEmail())
                .gender(user.getGender())
                .occupation(user.getOccupation())
                .address(user.getAddress())
                .role(user.getRole())
                .avatarUrl(user.getAvatarUrl())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
