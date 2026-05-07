package nlu.fit.dptemple.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "about")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class About extends BaseEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false, updatable = false)
    private String id;

    @Column(name = "years_established")
    private Integer yearsEstablished;

    @Column(name = "total_buddhists")
    private Integer totalBuddhists;

    @Column(name = "annual_events")
    private Integer annualEvents;

    @Column(name = "charity_activities")
    private Integer charityActivities;

    @Column(name = "introduction_text", columnDefinition = "TEXT")
    private String introductionText;
}
