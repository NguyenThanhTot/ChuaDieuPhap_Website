package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.DharmaTalk;
import nlu.fit.dptemple.entity.User;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.DharmaTalkRepository;
import nlu.fit.dptemple.repository.UserRepository;
import nlu.fit.dptemple.service.DharmaTalkService;
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
public class DharmaTalkServiceImpl implements DharmaTalkService {

    private final DharmaTalkRepository dharmaTalkRepository;
    private final UserRepository userRepository;

    @Override
    public DharmaTalk create(DharmaTalk dharmaTalk) {
        return dharmaTalkRepository.save(dharmaTalk);
    }

    @Override
    public DharmaTalk update(String id, DharmaTalk dharmaTalk) {
        DharmaTalk existing = dharmaTalkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DharmaTalk", "id", id));
        existing.setTitle(dharmaTalk.getTitle());
        existing.setYoutubeUrl(dharmaTalk.getYoutubeUrl());
        existing.setThumbnailUrl(dharmaTalk.getThumbnailUrl());
        existing.setDescription(dharmaTalk.getDescription());
        existing.setIsPublished(dharmaTalk.getIsPublished());
        existing.setHomepagePriority(dharmaTalk.getHomepagePriority());
        return dharmaTalkRepository.save(existing);
    }

    @Override
    public void delete(String id, String deletedById) {
        DharmaTalk dharmaTalk = dharmaTalkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DharmaTalk", "id", id));
        User deletedBy = userRepository.findById(deletedById).orElse(null);
        dharmaTalk.setDeletedBy(deletedBy);
        dharmaTalk.setDeletedAt(LocalDateTime.now());
        dharmaTalkRepository.save(dharmaTalk);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DharmaTalk> findById(String id) {
        return dharmaTalkRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DharmaTalk> findHomepageDharmaTalks() {
        return dharmaTalkRepository.findHomepageDharmaTalks();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DharmaTalk> findAllPublished(Pageable pageable) {
        return dharmaTalkRepository.findByIsPublishedTrueAndDeletedAtIsNullOrderByCreatedAtDesc(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DharmaTalk> findAllDeleted(Pageable pageable) {
        return dharmaTalkRepository.findByDeletedAtIsNotNull(pageable);
    }
}
