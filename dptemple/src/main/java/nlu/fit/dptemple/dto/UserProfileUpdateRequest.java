package nlu.fit.dptemple.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateRequest {

    @Size(max = 200, message = "Full name must not exceed 200 characters")
    private String fullName;

    @Size(max = 200, message = "Dharma name must not exceed 200 characters")
    private String dharmaName;

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;

    private String address;
}
