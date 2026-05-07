package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.Notification;
import nlu.fit.dptemple.entity.User;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.NotificationRepository;
import nlu.fit.dptemple.repository.UserRepository;
import nlu.fit.dptemple.service.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public Notification create(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification update(String id, Notification notification) {
        Notification existing = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        existing.setTitle(notification.getTitle());
        existing.setContent(notification.getContent());
        existing.setIsPublished(notification.getIsPublished());
        existing.setIsFeatured(notification.getIsFeatured());
        existing.setHomepagePriority(notification.getHomepagePriority());
        return notificationRepository.save(existing);
    }

    @Override
    public void delete(String id, String deletedById) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        User deletedBy = userRepository.findById(deletedById).orElse(null);
        notification.setDeletedBy(deletedBy);
        notification.setDeletedAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Notification> findById(String id) {
        return notificationRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Notification> findHomepageNotifications() {
        return notificationRepository.findHomepageNotifications();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Notification> findFeaturedNotifications() {
        return notificationRepository.findFeaturedNotifications();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Notification> findAllPublished(Pageable pageable) {
        return notificationRepository.findByIsPublishedTrueAndDeletedAtIsNull(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Notification> findAllDeleted(Pageable pageable) {
        return notificationRepository.findByDeletedAtIsNotNull(pageable);
    }
}
