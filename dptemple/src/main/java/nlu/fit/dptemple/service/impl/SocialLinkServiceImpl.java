package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.SocialLink;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.SocialLinkRepository;
import nlu.fit.dptemple.service.SocialLinkService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SocialLinkServiceImpl implements SocialLinkService {

    private final SocialLinkRepository socialLinkRepository;

    @Override
    public SocialLink create(SocialLink socialLink) {
        return socialLinkRepository.save(socialLink);
    }

    @Override
    public SocialLink update(String id, SocialLink socialLink) {
        SocialLink existing = socialLinkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialLink", "id", id));
        existing.setPlatform(socialLink.getPlatform());
        existing.setUrl(socialLink.getUrl());
        existing.setIcon(socialLink.getIcon());
        existing.setIsActive(socialLink.getIsActive());
        return socialLinkRepository.save(existing);
    }

    @Override
    public void delete(String id) {
        if (!socialLinkRepository.existsById(id)) {
            throw new ResourceNotFoundException("SocialLink", "id", id);
        }
        socialLinkRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public SocialLink findById(String id) {
        return socialLinkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialLink", "id", id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SocialLink> findAllActive() {
        return socialLinkRepository.findByIsActiveTrue();
    }
}
