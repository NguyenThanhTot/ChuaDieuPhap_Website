package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.HistoryMilestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryMilestoneRepository extends JpaRepository<HistoryMilestone, String> {

    List<HistoryMilestone> findByAboutIdOrderByDisplayOrderAsc(String aboutId);

    List<HistoryMilestone> findByAboutIdOrderByYearAsc(String aboutId);
}
