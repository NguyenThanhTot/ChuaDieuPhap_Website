package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AboutRepository extends JpaRepository<About, String> {

    Optional<About> findFirstByDeletedAtIsNull();
}
