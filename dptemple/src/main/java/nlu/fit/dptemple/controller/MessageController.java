package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.Message;
import nlu.fit.dptemple.service.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Tag(name = "Message Management", description = "APIs for managing contact messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    @Operation(summary = "Create a new message (public)")
    public ResponseEntity<Message> create(@RequestBody Message message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(messageService.create(message));
    }

    @PutMapping("/{id}/mark-read")
    @Operation(summary = "Mark message as read")
    public ResponseEntity<Message> markAsRead(@PathVariable String id) {
        return ResponseEntity.ok(messageService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a message")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        messageService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get message by ID")
    public ResponseEntity<Message> findById(@PathVariable String id) {
        return ResponseEntity.ok(messageService.findById(id));
    }

    @GetMapping("/unread")
    @Operation(summary = "Get all unread messages")
    public ResponseEntity<List<Message>> findUnread() {
        return ResponseEntity.ok(messageService.findUnread());
    }

    @GetMapping("/unread/paged")
    @Operation(summary = "Get unread messages with pagination")
    public ResponseEntity<Page<Message>> findAllUnread(Pageable pageable) {
        return ResponseEntity.ok(messageService.findAllUnread(pageable));
    }

    @GetMapping("/read/paged")
    @Operation(summary = "Get read messages with pagination")
    public ResponseEntity<Page<Message>> findAllRead(Pageable pageable) {
        return ResponseEntity.ok(messageService.findAllRead(pageable));
    }
}
