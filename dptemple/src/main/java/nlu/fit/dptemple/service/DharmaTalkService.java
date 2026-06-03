package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.DharmaTalk;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface DharmaTalkService {

    DharmaTalk create(DharmaTalk dharmaTalk);

    DharmaTalk update(String id, DharmaTalk dharmaTalk);

    void delete(String id, String deletedById);

    Optional<DharmaTalk> findById(String id);

    List<DharmaTalk> findHomepageDharmaTalks();

    List<DharmaTalk> findHomepageDharmaTalksLimited();

    Page<DharmaTalk> findAllPublished(Pageable pageable);

    Page<DharmaTalk> findAllDeleted(Pageable pageable);
}
