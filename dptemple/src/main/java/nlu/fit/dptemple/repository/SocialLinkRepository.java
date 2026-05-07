package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, String> {

    List<SocialLink> findByIsActiveTrue();
}
