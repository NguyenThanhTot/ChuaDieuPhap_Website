package nlu.fit.dptemple.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "social_links")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocialLink extends BaseEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false, updatable = false)
    private String id;

    @Column(name = "platform", length = 100, nullable = false)
    private String platform;

    @Column(name = "url", length = 500, nullable = false)
    private String url;

    @Column(name = "icon", length = 200)
    private String icon;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}
