package com.Ems.emp_man_sys.repository;

import com.Ems.emp_man_sys.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    List<Announcement> findByTitleContaining(String keyword);

}
