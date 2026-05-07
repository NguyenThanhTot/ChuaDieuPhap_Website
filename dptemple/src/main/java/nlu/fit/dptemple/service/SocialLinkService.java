package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.SocialLink;

import java.util.List;

public interface SocialLinkService {

    SocialLink create(SocialLink socialLink);

    SocialLink update(String id, SocialLink socialLink);

    void delete(String id);

    SocialLink findById(String id);

    List<SocialLink> findAllActive();
}
