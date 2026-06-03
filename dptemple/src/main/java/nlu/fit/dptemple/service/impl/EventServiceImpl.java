package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.Event;
import nlu.fit.dptemple.entity.User;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.EventRepository;
import nlu.fit.dptemple.repository.UserRepository;
import nlu.fit.dptemple.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Override
    public Event create(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event update(String id, Event event) {
        Event existing = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        existing.setTitle(event.getTitle());
        existing.setImageUrl(event.getImageUrl());
        existing.setStartDate(event.getStartDate());
        existing.setEndDate(event.getEndDate());
        existing.setEventTime(event.getEventTime());
        existing.setLocation(event.getLocation());
        existing.setDescription(event.getDescription());
        existing.setIsPublished(event.getIsPublished());
        existing.setIsFeatured(event.getIsFeatured());
        existing.setHomepagePriority(event.getHomepagePriority());
        return eventRepository.save(existing);
    }

    @Override
    public void delete(String id, String deletedById) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        User deletedBy = userRepository.findById(deletedById).orElse(null);
        event.setDeletedBy(deletedBy);
        event.setDeletedAt(LocalDateTime.now());
        eventRepository.save(event);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Event> findById(String id) {
        return eventRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Event> findHomepageEvents() {
        return eventRepository.findHomepageEvents();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Event> findHomepageEventsLimited() {
        return eventRepository.findHomepageEventsLimited();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Event> findFeaturedEvents() {
        return eventRepository.findFeaturedEvents();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Event> findFeaturedEventsLimited() {
        return eventRepository.findFeaturedEventsLimited();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Event> findUpcomingEvents(LocalDate fromDate) {
        return eventRepository.findByIsPublishedTrueAndDeletedAtIsNullAndStartDateGreaterThanEqualOrderByStartDateAsc(fromDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Event> findAllPublished(Pageable pageable) {
        return eventRepository.findByIsPublishedTrueAndDeletedAtIsNull(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Event> findAllDeleted(Pageable pageable) {
        return eventRepository.findByDeletedAtIsNotNull(pageable);
    }
}
