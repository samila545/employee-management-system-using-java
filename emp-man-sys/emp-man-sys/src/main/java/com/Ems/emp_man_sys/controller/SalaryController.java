package com.Ems.emp_man_sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.model.Salary;
import com.Ems.emp_man_sys.repository.SalaryRepository;

import java.util.List;
import java.util.Map;

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

    @PutMapping("/updateSalaryStatus/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Salary> updateSalaryStatus(@PathVariable Long id, @RequestBody Map<String, String> statusData) {
        String newStatus = statusData.get("status");

        return salaryRepository.findById(id).map(salary -> {
            salary.setStatus(newStatus); // Assuming there's a 'status' field in your Salary model
            Salary updatedSalary = salaryRepository.save(salary);
            return ResponseEntity.ok(updatedSalary);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/addSalary")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Salary> addSalary(@RequestBody Salary newSalary) {
        // Save the new salary to the database
        Salary savedSalary = salaryRepository.save(newSalary);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSalary);
    }


}
