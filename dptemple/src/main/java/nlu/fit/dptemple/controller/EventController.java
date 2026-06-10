package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.Event;
import nlu.fit.dptemple.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@Tag(name = "Event Management", description = "APIs for managing events")
public class EventController {

    private final EventService eventService;

    @PostMapping
    @Operation(summary = "Create a new event")
    public ResponseEntity<Event> create(@RequestBody Event event) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.create(event));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing event")
    public ResponseEntity<Event> update(@PathVariable("id") String id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.update(id, event));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete an event")
    public ResponseEntity<Void> delete(@PathVariable("id") String id, @RequestParam("deletedById") String deletedById) {
        eventService.delete(id, deletedById);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID")
    public ResponseEntity<Event> findById(@PathVariable("id") String id) {
        return eventService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/homepage")
    @Operation(summary = "Get homepage events")
    public ResponseEntity<List<Event>> findHomepage() {
        return ResponseEntity.ok(eventService.findHomepageEvents());
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured events")
    public ResponseEntity<List<Event>> findFeatured() {
        return ResponseEntity.ok(eventService.findFeaturedEvents());
    }

    @GetMapping("/upcoming")
    @Operation(summary = "Get upcoming events from a date")
    public ResponseEntity<List<Event>> findUpcoming(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate) {
        if (fromDate == null) {
            fromDate = LocalDate.now();
        }
        return ResponseEntity.ok(eventService.findUpcomingEvents(fromDate));
    }

    @GetMapping
    @Operation(summary = "Get all published events with pagination")
    public ResponseEntity<Page<Event>> findAllPublished(Pageable pageable) {
        return ResponseEntity.ok(eventService.findAllPublished(pageable));
    }

    @GetMapping("/deleted")
    @Operation(summary = "Get all deleted events with pagination")
    public ResponseEntity<Page<Event>> findAllDeleted(Pageable pageable) {
        return ResponseEntity.ok(eventService.findAllDeleted(pageable));
    }
}
