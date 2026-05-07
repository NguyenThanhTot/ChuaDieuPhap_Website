package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.About;
import nlu.fit.dptemple.service.AboutService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
@Tag(name = "About Management", description = "APIs for managing about page content")
public class AboutController {

    private final AboutService aboutService;

    @PostMapping
    @Operation(summary = "Create or update about content")
    public ResponseEntity<About> createOrUpdate(@RequestBody About about) {
        return ResponseEntity.status(HttpStatus.CREATED).body(aboutService.createOrUpdate(about));
    }

    @PutMapping
    @Operation(summary = "Update about content")
    public ResponseEntity<About> update(@RequestBody About about) {
        return ResponseEntity.ok(aboutService.createOrUpdate(about));
    }

    @GetMapping
    @Operation(summary = "Get about content")
    public ResponseEntity<About> findActive() {
        return aboutService.findActive()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
