package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MessageService {

    Message create(Message message);

    Message markAsRead(String id);

    void delete(String id);

    Message findById(String id);

    List<Message> findUnread();

    Page<Message> findAllUnread(Pageable pageable);

    Page<Message> findAllRead(Pageable pageable);
}
