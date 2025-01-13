package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Manager;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    // Endpoint to get all managers
    @GetMapping("/getManagers")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Manager> getManagers() {
        return managerRepository.findAll();
    }
}
