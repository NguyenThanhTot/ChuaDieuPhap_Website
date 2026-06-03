package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {

    @Query("SELECT e FROM Event e WHERE e.isPublished = true AND e.deletedAt IS NULL AND e.homepagePriority > 0 ORDER BY e.homepagePriority ASC, e.startDate DESC")
    List<Event> findHomepageEvents();

    @Query("SELECT e FROM Event e WHERE e.isPublished = true AND e.deletedAt IS NULL AND e.homepagePriority > 0 ORDER BY e.homepagePriority ASC, e.startDate DESC LIMIT 6")
    List<Event> findHomepageEventsLimited();

    @Query("SELECT e FROM Event e WHERE e.isPublished = true AND e.deletedAt IS NULL AND e.isFeatured = true ORDER BY e.startDate DESC")
    List<Event> findFeaturedEvents();

    @Query("SELECT e FROM Event e WHERE e.isPublished = true AND e.deletedAt IS NULL AND e.isFeatured = true ORDER BY e.startDate DESC LIMIT 3")
    List<Event> findFeaturedEventsLimited();

    List<Event> findByIsPublishedTrueAndDeletedAtIsNullAndStartDateGreaterThanEqualOrderByStartDateAsc(LocalDate date);

    Page<Event> findByIsPublishedTrueAndDeletedAtIsNull(Pageable pageable);

    Page<Event> findByDeletedAtIsNotNull(Pageable pageable);
}
