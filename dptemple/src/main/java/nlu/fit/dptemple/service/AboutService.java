package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.About;

import java.util.Optional;

public interface AboutService {

    About createOrUpdate(About about);

    Optional<About> findActive();
}
