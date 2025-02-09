package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.repository.DepartmentRepository;

import java.util.List;

@RestController
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    // Get all departments
    @GetMapping("/getDepartments")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    // Enable CORS for the frontend
    public List<Department> getDepartments() {
        return departmentRepository.findAll();
    }
}
