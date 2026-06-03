package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {

    @Query("SELECT n FROM Notification n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.homepagePriority > 0 ORDER BY n.homepagePriority ASC")
    List<Notification> findHomepageNotifications();

    @Query("SELECT n FROM Notification n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.homepagePriority > 0 ORDER BY n.homepagePriority ASC LIMIT 10")
    List<Notification> findHomepageNotificationsLimited();

    @Query("SELECT n FROM Notification n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.isFeatured = true ORDER BY n.homepagePriority ASC")
    List<Notification> findFeaturedNotifications();

    @Query("SELECT n FROM Notification n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.isFeatured = true ORDER BY n.homepagePriority ASC LIMIT 3")
    List<Notification> findFeaturedNotificationsLimited();

    Page<Notification> findByIsPublishedTrueAndDeletedAtIsNull(Pageable pageable);

    Page<Notification> findByDeletedAtIsNotNull(Pageable pageable);
}
