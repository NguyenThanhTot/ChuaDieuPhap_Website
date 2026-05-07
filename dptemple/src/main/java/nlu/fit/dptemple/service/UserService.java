package nlu.fit.dptemple.service;

import nlu.fit.dptemple.dto.UserRequest;
import nlu.fit.dptemple.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserResponse createUser(UserRequest request);

    UserResponse updateUser(String id, UserRequest request);

    void deleteUser(String id, String deletedById);

    UserResponse findById(String id);

    UserResponse findByEmail(String email);

    Page<UserResponse> findAllActive(Pageable pageable);

    Page<UserResponse> findAllDeleted(Pageable pageable);

    boolean existsByEmail(String email);
}
