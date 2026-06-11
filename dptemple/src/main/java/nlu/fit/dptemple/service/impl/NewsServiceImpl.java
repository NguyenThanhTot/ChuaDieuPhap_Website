package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.News;
import nlu.fit.dptemple.entity.User;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.NewsRepository;
import nlu.fit.dptemple.repository.UserRepository;
import nlu.fit.dptemple.service.NewsService;
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
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;

    @Override
    public News create(News news) {
        if (news.getAuthor() != null && news.getAuthor().getId() != null) {
            User author = userRepository.findById(news.getAuthor().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", news.getAuthor().getId()));
            news.setAuthor(author);
        }
        return newsRepository.save(news);
    }

    @Override
    public News update(String id, News news) {
        News existing = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News", "id", id));
        if (news.getTitle() != null) {
            existing.setTitle(news.getTitle());
        }
        if (news.getPublishedDate() != null) {
            existing.setPublishedDate(news.getPublishedDate());
        }
        if (news.getAuthor() != null && news.getAuthor().getId() != null) {
            User author = userRepository.findById(news.getAuthor().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", news.getAuthor().getId()));
            existing.setAuthor(author);
        }
        if (news.getThumbnailUrl() != null) {
            existing.setThumbnailUrl(news.getThumbnailUrl());
        }
        if (news.getContent() != null) {
            existing.setContent(news.getContent());
        }
        if (news.getIsPublished() != null) {
            existing.setIsPublished(news.getIsPublished());
        }
        if (news.getIsFeatured() != null) {
            existing.setIsFeatured(news.getIsFeatured());
        }
        if (news.getHomepagePriority() != null) {
            existing.setHomepagePriority(news.getHomepagePriority());
        }
        return newsRepository.save(existing);
    }

    @Override
    public void delete(String id, String deletedById) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News", "id", id));
        User deletedBy = userRepository.findById(deletedById).orElse(null);
        news.setDeletedBy(deletedBy);
        news.setDeletedAt(LocalDateTime.now());
        newsRepository.save(news);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<News> findById(String id) {
        return newsRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<News> findHomepageNews() {
        return newsRepository.findHomepageNews();
    }

    @Override
    @Transactional(readOnly = true)
    public List<News> findHomepageNewsLimited() {
        return newsRepository.findHomepageNewsLimited();
    }

    @Override
    @Transactional(readOnly = true)
    public List<News> findFeaturedNews() {
        return newsRepository.findFeaturedNews();
    }

    @Override
    @Transactional(readOnly = true)
    public List<News> findFeaturedNewsLimited() {
        return newsRepository.findFeaturedNewsLimited();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<News> findAllPublished(Pageable pageable) {
        return newsRepository.findByIsPublishedTrueAndDeletedAtIsNullOrderByPublishedDateDesc(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<News> findAllDeleted(Pageable pageable) {
        return newsRepository.findByDeletedAtIsNotNull(pageable);
    }
}
