package nlu.fit.dptemple.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.fit.dptemple.entity.Gender;
import nlu.fit.dptemple.entity.Role;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String fullName;
    private String dharmaName;
    private String phone;
    private LocalDate dateOfBirth;
    private String email;
    private Gender gender;
    private String occupation;
    private String address;
    private Role role;
    private String avatarUrl;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
