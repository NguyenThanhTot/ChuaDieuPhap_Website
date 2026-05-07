package nlu.fit.dptemple.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "dharma_talks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DharmaTalk extends BaseEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false, updatable = false)
    private String id;

    @Column(name = "title", length = 500, nullable = false)
    private String title;

    @Column(name = "youtube_url", length = 500, nullable = false)
    private String youtubeUrl;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = false;

    @Column(name = "homepage_priority", nullable = false)
    private Integer homepagePriority = 0;
}
