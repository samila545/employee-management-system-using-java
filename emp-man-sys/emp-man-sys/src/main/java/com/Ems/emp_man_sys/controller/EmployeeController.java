package com.Ems.emp_man_sys.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.repository.EmployeeRepository;


import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/getEmployees")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }
}
