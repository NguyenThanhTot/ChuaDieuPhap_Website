package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.About;
import nlu.fit.dptemple.repository.AboutRepository;
import nlu.fit.dptemple.service.AboutService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;

    @Override
    public About createOrUpdate(About about) {
        Optional<About> existing = aboutRepository.findFirstByDeletedAtIsNull();
        if (existing.isPresent()) {
            About current = existing.get();
            current.setYearsEstablished(about.getYearsEstablished());
            current.setTotalBuddhists(about.getTotalBuddhists());
            current.setAnnualEvents(about.getAnnualEvents());
            current.setCharityActivities(about.getCharityActivities());
            current.setIntroductionText(about.getIntroductionText());
            return aboutRepository.save(current);
        }
        return aboutRepository.save(about);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<About> findActive() {
        return aboutRepository.findFirstByDeletedAtIsNull();
    }
}
