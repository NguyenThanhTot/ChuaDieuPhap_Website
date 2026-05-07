package nlu.fit.dptemple.service;

import nlu.fit.dptemple.entity.HomeConfig;

import java.util.Optional;

public interface HomeConfigService {

    HomeConfig createOrUpdate(HomeConfig homeConfig);

    Optional<HomeConfig> findActive();
}
