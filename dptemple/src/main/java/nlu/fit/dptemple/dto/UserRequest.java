package nlu.fit.dptemple.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.fit.dptemple.entity.Gender;
import nlu.fit.dptemple.entity.Role;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 200, message = "Full name must not exceed 200 characters")
    private String fullName;

    @Size(max = 200, message = "Dharma name must not exceed 200 characters")
    private String dharmaName;

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;

    private LocalDate dateOfBirth;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private Gender gender;

    @Size(max = 200, message = "Occupation must not exceed 200 characters")
    private String occupation;

    private String address;

    @NotNull(message = "Role is required")
    private Role role;

    private String avatarUrl;

    private Boolean isActive;
}
