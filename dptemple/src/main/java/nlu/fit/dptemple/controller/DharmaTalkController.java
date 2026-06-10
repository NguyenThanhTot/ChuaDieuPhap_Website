package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.DharmaTalk;
import nlu.fit.dptemple.service.DharmaTalkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dharma-talks")
@RequiredArgsConstructor
@Tag(name = "Dharma Talk Management", description = "APIs for managing dharma talks")
public class DharmaTalkController {

    private final DharmaTalkService dharmaTalkService;

    @PostMapping
    @Operation(summary = "Create a new dharma talk")
    public ResponseEntity<DharmaTalk> create(@RequestBody DharmaTalk dharmaTalk) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dharmaTalkService.create(dharmaTalk));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing dharma talk")
    public ResponseEntity<DharmaTalk> update(@PathVariable("id") String id, @RequestBody DharmaTalk dharmaTalk) {
        return ResponseEntity.ok(dharmaTalkService.update(id, dharmaTalk));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a dharma talk")
    public ResponseEntity<Void> delete(@PathVariable("id") String id, @RequestParam("deletedById") String deletedById) {
        dharmaTalkService.delete(id, deletedById);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get dharma talk by ID")
    public ResponseEntity<DharmaTalk> findById(@PathVariable("id") String id) {
        return dharmaTalkService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/homepage")
    @Operation(summary = "Get homepage dharma talks")
    public ResponseEntity<List<DharmaTalk>> findHomepage() {
        return ResponseEntity.ok(dharmaTalkService.findHomepageDharmaTalks());
    }

    @GetMapping
    @Operation(summary = "Get all published dharma talks with pagination")
    public ResponseEntity<Page<DharmaTalk>> findAllPublished(Pageable pageable) {
        return ResponseEntity.ok(dharmaTalkService.findAllPublished(pageable));
    }

    @GetMapping("/deleted")
    @Operation(summary = "Get all deleted dharma talks with pagination")
    public ResponseEntity<Page<DharmaTalk>> findAllDeleted(Pageable pageable) {
        return ResponseEntity.ok(dharmaTalkService.findAllDeleted(pageable));
    }
}
