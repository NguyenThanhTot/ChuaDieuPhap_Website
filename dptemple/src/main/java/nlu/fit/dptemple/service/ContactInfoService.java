package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.ContactInfo;

import java.util.List;

public interface ContactInfoService {

    ContactInfo create(ContactInfo contactInfo);

    ContactInfo update(String id, ContactInfo contactInfo);

    void delete(String id);

    ContactInfo findById(String id);

    List<ContactInfo> findAllActive();
}
