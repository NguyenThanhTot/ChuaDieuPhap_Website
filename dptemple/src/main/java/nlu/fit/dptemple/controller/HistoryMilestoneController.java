package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.HistoryMilestone;
import nlu.fit.dptemple.service.HistoryMilestoneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history-milestones")
@RequiredArgsConstructor
@Tag(name = "History Milestone Management", description = "APIs for managing history milestones")
public class HistoryMilestoneController {

    private final HistoryMilestoneService milestoneService;

    @PostMapping
    @Operation(summary = "Create a new history milestone")
    public ResponseEntity<HistoryMilestone> create(@RequestBody HistoryMilestone milestone) {
        return ResponseEntity.status(HttpStatus.CREATED).body(milestoneService.create(milestone));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing history milestone")
    public ResponseEntity<HistoryMilestone> update(@PathVariable String id, @RequestBody HistoryMilestone milestone) {
        return ResponseEntity.ok(milestoneService.update(id, milestone));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a history milestone")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        milestoneService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get history milestone by ID")
    public ResponseEntity<HistoryMilestone> findById(@PathVariable String id) {
        return ResponseEntity.ok(milestoneService.findById(id));
    }

    @GetMapping("/by-about/{aboutId}")
    @Operation(summary = "Get history milestones by about ID")
    public ResponseEntity<List<HistoryMilestone>> findByAboutId(@PathVariable String aboutId) {
        return ResponseEntity.ok(milestoneService.findByAboutId(aboutId));
    }
}
