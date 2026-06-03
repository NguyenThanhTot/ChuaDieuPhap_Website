package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, String> {

    @Query("SELECT n FROM News n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.homepagePriority > 0 ORDER BY n.homepagePriority ASC, n.publishedDate DESC")
    List<News> findHomepageNews();

    @Query("SELECT n FROM News n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.homepagePriority > 0 ORDER BY n.homepagePriority ASC, n.publishedDate DESC LIMIT 6")
    List<News> findHomepageNewsLimited();

    @Query("SELECT n FROM News n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.isFeatured = true ORDER BY n.publishedDate DESC")
    List<News> findFeaturedNews();

    @Query("SELECT n FROM News n WHERE n.isPublished = true AND n.deletedAt IS NULL AND n.isFeatured = true ORDER BY n.publishedDate DESC LIMIT 3")
    List<News> findFeaturedNewsLimited();

    Page<News> findByIsPublishedTrueAndDeletedAtIsNullOrderByPublishedDateDesc(Pageable pageable);

    Page<News> findByDeletedAtIsNotNull(Pageable pageable);
}
