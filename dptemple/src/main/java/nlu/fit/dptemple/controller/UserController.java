package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.dto.ApiResponse;
import nlu.fit.dptemple.dto.UserRequest;
import nlu.fit.dptemple.dto.UserResponse;
import nlu.fit.dptemple.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User Management", description = "APIs for managing users")
public class UserController {

    private final UserService userService;

    @PostMapping
    @Operation(summary = "Create a new user")
    public ResponseEntity<ApiResponse<UserResponse>> create(@Valid @RequestBody UserRequest request) {
        UserResponse created = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing user")
    public ResponseEntity<ApiResponse<UserResponse>> update(@PathVariable("id") String id, @Valid @RequestBody UserRequest request) {
        UserResponse updated = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a user")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable("id") String id, @RequestParam("deletedById") String deletedById) {
        userService.deleteUser(id, deletedById);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<ApiResponse<UserResponse>> findById(@PathVariable("id") String id) {
        return ResponseEntity.ok(ApiResponse.success(userService.findById(id)));
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get user by email")
    public ResponseEntity<ApiResponse<UserResponse>> findByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(ApiResponse.success(userService.findByEmail(email)));
    }

    @GetMapping
    @Operation(summary = "Get all active users with pagination")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> findAllActive(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(userService.findAllActive(pageable)));
    }

    @GetMapping("/deleted")
    @Operation(summary = "Get all deleted users with pagination")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> findAllDeleted(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(userService.findAllDeleted(pageable)));
    }

    @GetMapping("/check-email")
    @Operation(summary = "Check if email exists")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(ApiResponse.success(Map.of("exists", userService.existsByEmail(email))));
    }
}
