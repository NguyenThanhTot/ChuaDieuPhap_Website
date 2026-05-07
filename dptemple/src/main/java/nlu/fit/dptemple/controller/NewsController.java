package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.News;
import nlu.fit.dptemple.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@Tag(name = "News Management", description = "APIs for managing news articles")
public class NewsController {

    private final NewsService newsService;

    @PostMapping
    @Operation(summary = "Create a new news article")
    public ResponseEntity<News> create(@RequestBody News news) {
        return ResponseEntity.status(HttpStatus.CREATED).body(newsService.create(news));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing news article")
    public ResponseEntity<News> update(@PathVariable String id, @RequestBody News news) {
        return ResponseEntity.ok(newsService.update(id, news));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a news article")
    public ResponseEntity<Void> delete(@PathVariable String id, @RequestParam String deletedById) {
        newsService.delete(id, deletedById);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get news article by ID")
    public ResponseEntity<News> findById(@PathVariable String id) {
        return newsService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/homepage")
    @Operation(summary = "Get homepage news")
    public ResponseEntity<List<News>> findHomepage() {
        return ResponseEntity.ok(newsService.findHomepageNews());
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured news")
    public ResponseEntity<List<News>> findFeatured() {
        return ResponseEntity.ok(newsService.findFeaturedNews());
    }

    @GetMapping
    @Operation(summary = "Get all published news with pagination")
    public ResponseEntity<Page<News>> findAllPublished(Pageable pageable) {
        return ResponseEntity.ok(newsService.findAllPublished(pageable));
    }

    @GetMapping("/deleted")
    @Operation(summary = "Get all deleted news with pagination")
    public ResponseEntity<Page<News>> findAllDeleted(Pageable pageable) {
        return ResponseEntity.ok(newsService.findAllDeleted(pageable));
    }
}
