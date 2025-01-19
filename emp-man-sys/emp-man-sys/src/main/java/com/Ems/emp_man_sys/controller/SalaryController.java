package com.Ems.emp_man_sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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


    @GetMapping("/getSalaryofEmployee")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> getSalaryByFirstName() {

        String firstName = LoginController.loggedinFirstname;
        System.out.println(firstName);

        if (firstName == null || firstName.isEmpty()) {
            return ResponseEntity.status(400).body("No employee is logged in");
        }

        // Retrieve salaries by first name
        List<Salary> salaries = salaryRepository.findByFirstname(firstName);
        System.out.println(salaries);

        if (salaries.isEmpty()) {
            return ResponseEntity.status(404).body("No salary records found for employee: " + firstName);
        }

        return ResponseEntity.ok(salaries);
    }

    @GetMapping("/getSalaryofManager")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> getSalaryByFirstNameofManager() {

        String firstName = LoginController.loggedinFirstname;
        System.out.println(firstName);

        if (firstName == null || firstName.isEmpty()) {
            return ResponseEntity.status(400).body("No Manager is logged in");
        }

        // Retrieve salaries by first name
        List<Salary> salaries = salaryRepository.findByFirstname(firstName);
        System.out.println(salaries);

        if (salaries.isEmpty()) {
            return ResponseEntity.status(404).body("No salary records found for employee: " + firstName);
        }

        return ResponseEntity.ok(salaries);
    }

}
