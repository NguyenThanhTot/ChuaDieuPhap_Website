package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {

    List<Message> findByIsReadFalseOrderByCreatedAtDesc();

    Page<Message> findByIsReadFalse(Pageable pageable);

    Page<Message> findByIsReadTrue(Pageable pageable);
}
