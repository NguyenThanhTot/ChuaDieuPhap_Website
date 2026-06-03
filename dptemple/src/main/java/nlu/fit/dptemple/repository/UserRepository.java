package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailVerificationToken(String token);

    boolean existsByEmail(String email);

    Page<User> findByIsActiveTrueAndDeletedAtIsNull(Pageable pageable);

    Page<User> findByDeletedAtIsNotNull(Pageable pageable);
}
