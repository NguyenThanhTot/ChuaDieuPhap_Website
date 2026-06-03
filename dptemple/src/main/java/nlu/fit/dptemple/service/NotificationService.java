package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    Notification create(Notification notification);

    Notification update(String id, Notification notification);

    void delete(String id, String deletedById);

    Optional<Notification> findById(String id);

    List<Notification> findHomepageNotifications();

    List<Notification> findHomepageNotificationsLimited();

    List<Notification> findFeaturedNotifications();

    List<Notification> findFeaturedNotificationsLimited();

    Page<Notification> findAllPublished(Pageable pageable);

    Page<Notification> findAllDeleted(Pageable pageable);
}
