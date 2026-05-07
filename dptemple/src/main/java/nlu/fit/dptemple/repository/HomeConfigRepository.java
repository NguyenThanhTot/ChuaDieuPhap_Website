package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.HomeConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HomeConfigRepository extends JpaRepository<HomeConfig, String> {

    Optional<HomeConfig> findFirstByDeletedAtIsNull();
}
