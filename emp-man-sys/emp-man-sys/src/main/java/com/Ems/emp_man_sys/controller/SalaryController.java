package com.Ems.emp_man_sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.model.Salary;
import com.Ems.emp_man_sys.repository.SalaryRepository;

import java.util.List;

@RestController
public class SalaryController {

    @Autowired
    private SalaryRepository salaryRepository;

    @GetMapping("/getSalaries")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Salary> getSalaries() {
        return salaryRepository.findAll();
    }
}
