package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.Notification;
import nlu.fit.dptemple.service.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification Management", description = "APIs for managing notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    @Operation(summary = "Create a new notification")
    public ResponseEntity<Notification> create(@RequestBody Notification notification) {
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.create(notification));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing notification")
    public ResponseEntity<Notification> update(@PathVariable String id, @RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.update(id, notification));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a notification")
    public ResponseEntity<Void> delete(@PathVariable String id, @RequestParam String deletedById) {
        notificationService.delete(id, deletedById);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get notification by ID")
    public ResponseEntity<Notification> findById(@PathVariable String id) {
        return notificationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/homepage")
    @Operation(summary = "Get homepage notifications")
    public ResponseEntity<List<Notification>> findHomepage() {
        return ResponseEntity.ok(notificationService.findHomepageNotifications());
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured notifications")
    public ResponseEntity<List<Notification>> findFeatured() {
        return ResponseEntity.ok(notificationService.findFeaturedNotifications());
    }

    @GetMapping
    @Operation(summary = "Get all published notifications with pagination")
    public ResponseEntity<Page<Notification>> findAllPublished(Pageable pageable) {
        return ResponseEntity.ok(notificationService.findAllPublished(pageable));
    }

    @GetMapping("/deleted")
    @Operation(summary = "Get all deleted notifications with pagination")
    public ResponseEntity<Page<Notification>> findAllDeleted(Pageable pageable) {
        return ResponseEntity.ok(notificationService.findAllDeleted(pageable));
    }
}
