package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EventService {

    Event create(Event event);

    Event update(String id, Event event);

    void delete(String id, String deletedById);

    Optional<Event> findById(String id);

    List<Event> findHomepageEvents();

    List<Event> findFeaturedEvents();

    List<Event> findUpcomingEvents(LocalDate fromDate);

    Page<Event> findAllPublished(Pageable pageable);

    Page<Event> findAllDeleted(Pageable pageable);
}
