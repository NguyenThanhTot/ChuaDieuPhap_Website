package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.HistoryMilestone;

import java.util.List;

public interface HistoryMilestoneService {

    HistoryMilestone create(HistoryMilestone milestone);

    HistoryMilestone update(String id, HistoryMilestone milestone);

    void delete(String id);

    HistoryMilestone findById(String id);

    List<HistoryMilestone> findByAboutId(String aboutId);
}
