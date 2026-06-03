package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface NewsService {

    News create(News news);

    News update(String id, News news);

    void delete(String id, String deletedById);

    Optional<News> findById(String id);

    List<News> findHomepageNews();

    List<News> findHomepageNewsLimited();

    List<News> findFeaturedNews();

    List<News> findFeaturedNewsLimited();

    Page<News> findAllPublished(Pageable pageable);

    Page<News> findAllDeleted(Pageable pageable);
}
