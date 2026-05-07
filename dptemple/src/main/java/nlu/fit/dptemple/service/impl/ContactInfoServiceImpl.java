package nlu.fit.dptemple.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.entity.ContactInfo;
import nlu.fit.dptemple.exception.ResourceNotFoundException;
import nlu.fit.dptemple.repository.ContactInfoRepository;
import nlu.fit.dptemple.service.ContactInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactInfoServiceImpl implements ContactInfoService {

    private final ContactInfoRepository contactInfoRepository;

    @Override
    public ContactInfo create(ContactInfo contactInfo) {
        return contactInfoRepository.save(contactInfo);
    }

    @Override
    public ContactInfo update(String id, ContactInfo contactInfo) {
        ContactInfo existing = contactInfoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactInfo", "id", id));
        existing.setLabel(contactInfo.getLabel());
        existing.setAddress(contactInfo.getAddress());
        existing.setPhone(contactInfo.getPhone());
        existing.setEmail(contactInfo.getEmail());
        existing.setOpenTime(contactInfo.getOpenTime());
        existing.setCloseTime(contactInfo.getCloseTime());
        existing.setIsActive(contactInfo.getIsActive());
        return contactInfoRepository.save(existing);
    }

    @Override
    public void delete(String id) {
        if (!contactInfoRepository.existsById(id)) {
            throw new ResourceNotFoundException("ContactInfo", "id", id);
        }
        contactInfoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactInfo findById(String id) {
        return contactInfoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactInfo", "id", id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactInfo> findAllActive() {
        return contactInfoRepository.findByIsActiveTrue();
    }
}
