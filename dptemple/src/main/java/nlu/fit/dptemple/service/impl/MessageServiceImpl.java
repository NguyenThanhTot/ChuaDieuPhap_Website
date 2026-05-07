package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.Message;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.MessageRepository;
import nlu.fit.dptemple.service.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Override
    public Message create(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message markAsRead(String id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", id));
        message.setIsRead(true);
        return messageRepository.save(message);
    }

    @Override
    public void delete(String id) {
        if (!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Message", "id", id);
        }
        messageRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Message findById(String id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Message> findUnread() {
        return messageRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Message> findAllUnread(Pageable pageable) {
        return messageRepository.findByIsReadFalse(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Message> findAllRead(Pageable pageable) {
        return messageRepository.findByIsReadTrue(pageable);
    }
}
