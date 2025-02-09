package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Announcement;
import com.Ems.emp_man_sys.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @GetMapping("getAnnouncements")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Announcement> getAnnouncements() {

        return announcementRepository.findAll();
    }

    @PostMapping("createAnnouncement")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        announcementRepository.save(announcement);  // Save the announcement
        return ResponseEntity.status(HttpStatus.CREATED).body(announcement);
    }
}
