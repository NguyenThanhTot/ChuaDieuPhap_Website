package nlu.fit.dptemple.repository;

import nlu.fit.dptemple.entity.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactInfoRepository extends JpaRepository<ContactInfo, String> {

    List<ContactInfo> findByIsActiveTrue();
}
