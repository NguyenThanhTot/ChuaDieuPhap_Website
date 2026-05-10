package nlu.fit.dptemple.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.fit.dptemple.entity.Role;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String id;
    private String fullName;
    private String dharmaName;
    private String email;
    private Role role;
    private String avatarUrl;
    private LocalDateTime loginTime;
}
