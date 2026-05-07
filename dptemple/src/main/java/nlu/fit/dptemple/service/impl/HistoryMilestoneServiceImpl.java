package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.HistoryMilestone;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.HistoryMilestoneRepository;
import nlu.fit.dptemple.service.HistoryMilestoneService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HistoryMilestoneServiceImpl implements HistoryMilestoneService {

    private final HistoryMilestoneRepository milestoneRepository;

    @Override
    public HistoryMilestone create(HistoryMilestone milestone) {
        return milestoneRepository.save(milestone);
    }

    @Override
    public HistoryMilestone update(String id, HistoryMilestone milestone) {
        HistoryMilestone existing = milestoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HistoryMilestone", "id", id));
        existing.setTitle(milestone.getTitle());
        existing.setYear(milestone.getYear());
        existing.setDescription(milestone.getDescription());
        existing.setDisplayOrder(milestone.getDisplayOrder());
        return milestoneRepository.save(existing);
    }

    @Override
    public void delete(String id) {
        if (!milestoneRepository.existsById(id)) {
            throw new ResourceNotFoundException("HistoryMilestone", "id", id);
        }
        milestoneRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public HistoryMilestone findById(String id) {
        return milestoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HistoryMilestone", "id", id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<HistoryMilestone> findByAboutId(String aboutId) {
        return milestoneRepository.findByAboutIdOrderByDisplayOrderAsc(aboutId);
    }
}
