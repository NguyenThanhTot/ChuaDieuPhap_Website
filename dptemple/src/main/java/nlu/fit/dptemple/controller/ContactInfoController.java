package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.ContactInfo;
import nlu.fit.dptemple.service.ContactInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-info")
@RequiredArgsConstructor
@Tag(name = "Contact Info Management", description = "APIs for managing contact information")
public class ContactInfoController {

    private final ContactInfoService contactInfoService;

    @PostMapping
    @Operation(summary = "Create a new contact info")
    public ResponseEntity<ContactInfo> create(@RequestBody ContactInfo contactInfo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactInfoService.create(contactInfo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing contact info")
    public ResponseEntity<ContactInfo> update(@PathVariable String id, @RequestBody ContactInfo contactInfo) {
        return ResponseEntity.ok(contactInfoService.update(id, contactInfo));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a contact info")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        contactInfoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get contact info by ID")
    public ResponseEntity<ContactInfo> findById(@PathVariable String id) {
        return ResponseEntity.ok(contactInfoService.findById(id));
    }

    @GetMapping
    @Operation(summary = "Get all active contact info")
    public ResponseEntity<List<ContactInfo>> findAllActive() {
        return ResponseEntity.ok(contactInfoService.findAllActive());
    }
}
