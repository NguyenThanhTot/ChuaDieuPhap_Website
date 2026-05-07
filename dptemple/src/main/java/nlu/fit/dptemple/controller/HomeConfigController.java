package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.HomeConfig;
import nlu.fit.dptemple.service.HomeConfigService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home-config")
@RequiredArgsConstructor
@Tag(name = "Home Config Management", description = "APIs for managing homepage configuration")
public class HomeConfigController {

    private final HomeConfigService homeConfigService;

    @PostMapping
    @Operation(summary = "Create or update home config")
    public ResponseEntity<HomeConfig> createOrUpdate(@RequestBody HomeConfig homeConfig) {
        return ResponseEntity.status(HttpStatus.CREATED).body(homeConfigService.createOrUpdate(homeConfig));
    }

    @PutMapping
    @Operation(summary = "Update home config")
    public ResponseEntity<HomeConfig> update(@RequestBody HomeConfig homeConfig) {
        return ResponseEntity.ok(homeConfigService.createOrUpdate(homeConfig));
    }

    @GetMapping
    @Operation(summary = "Get home config")
    public ResponseEntity<HomeConfig> findActive() {
        return homeConfigService.findActive()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
