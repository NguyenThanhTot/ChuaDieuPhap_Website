package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.SocialLink;
import nlu.fit.dptemple.service.SocialLinkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/social-links")
@RequiredArgsConstructor
@Tag(name = "Social Link Management", description = "APIs for managing social links")
public class SocialLinkController {

    private final SocialLinkService socialLinkService;

    @PostMapping
    @Operation(summary = "Create a new social link")
    public ResponseEntity<SocialLink> create(@RequestBody SocialLink socialLink) {
        return ResponseEntity.status(HttpStatus.CREATED).body(socialLinkService.create(socialLink));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing social link")
    public ResponseEntity<SocialLink> update(@PathVariable String id, @RequestBody SocialLink socialLink) {
        return ResponseEntity.ok(socialLinkService.update(id, socialLink));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a social link")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        socialLinkService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get social link by ID")
    public ResponseEntity<SocialLink> findById(@PathVariable String id) {
        return ResponseEntity.ok(socialLinkService.findById(id));
    }

    @GetMapping
    @Operation(summary = "Get all active social links")
    public ResponseEntity<List<SocialLink>> findAllActive() {
        return ResponseEntity.ok(socialLinkService.findAllActive());
    }
}
