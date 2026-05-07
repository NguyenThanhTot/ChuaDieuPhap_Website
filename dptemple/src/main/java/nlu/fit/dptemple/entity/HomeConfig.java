package nlu.fit.dptemple.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "home_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HomeConfig extends BaseEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false, updatable = false)
    private String id;

    @Column(name = "hero_image_url", length = 500)
    private String heroImageUrl;

    @Column(name = "hero_title", length = 500)
    private String heroTitle;

    @Column(name = "hero_description", columnDefinition = "TEXT")
    private String heroDescription;

    @Column(name = "introduction_text", columnDefinition = "TEXT")
    private String introductionText;
}
