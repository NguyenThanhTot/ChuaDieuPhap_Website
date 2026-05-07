package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.HomeConfig;
import nlu.fit.dptemple.repository.HomeConfigRepository;
import nlu.fit.dptemple.service.HomeConfigService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class HomeConfigServiceImpl implements HomeConfigService {

    private final HomeConfigRepository homeConfigRepository;

    @Override
    public HomeConfig createOrUpdate(HomeConfig homeConfig) {
        Optional<HomeConfig> existing = homeConfigRepository.findFirstByDeletedAtIsNull();
        if (existing.isPresent()) {
            HomeConfig current = existing.get();
            current.setHeroImageUrl(homeConfig.getHeroImageUrl());
            current.setHeroTitle(homeConfig.getHeroTitle());
            current.setHeroDescription(homeConfig.getHeroDescription());
            current.setIntroductionText(homeConfig.getIntroductionText());
            return homeConfigRepository.save(current);
        }
        return homeConfigRepository.save(homeConfig);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HomeConfig> findActive() {
        return homeConfigRepository.findFirstByDeletedAtIsNull();
    }
}
