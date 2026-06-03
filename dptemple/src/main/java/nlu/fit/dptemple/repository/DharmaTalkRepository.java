package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.DharmaTalk;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DharmaTalkRepository extends JpaRepository<DharmaTalk, String> {

    @Query("SELECT d FROM DharmaTalk d WHERE d.isPublished = true AND d.deletedAt IS NULL AND d.homepagePriority > 0 ORDER BY d.homepagePriority ASC, d.createdAt DESC")
    List<DharmaTalk> findHomepageDharmaTalks();

    @Query("SELECT d FROM DharmaTalk d WHERE d.isPublished = true AND d.deletedAt IS NULL AND d.homepagePriority > 0 ORDER BY d.homepagePriority ASC, d.createdAt DESC LIMIT 4")
    List<DharmaTalk> findHomepageDharmaTalksLimited();

    Page<DharmaTalk> findByIsPublishedTrueAndDeletedAtIsNullOrderByCreatedAtDesc(Pageable pageable);

    Page<DharmaTalk> findByDeletedAtIsNotNull(Pageable pageable);
}
