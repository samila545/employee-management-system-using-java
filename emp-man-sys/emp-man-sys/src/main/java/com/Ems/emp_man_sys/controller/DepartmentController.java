package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.repository.DepartmentRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @DeleteMapping("/departments/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        if (departmentRepository.existsById(id)) {
            departmentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/addDepartment")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Department> addDepartment(
            @RequestParam("departmentName") String departmentName,
            @RequestParam("managerName") String managerName,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "numberOfEmployees", required = false) Integer numberOfEmployees,
            @RequestParam(value = "budget", required = false) BigDecimal budget,
            @RequestParam(value = "createdDate", required = false) LocalDate createdDate,
            @RequestParam(value = "description", required = false) String description) {

        // Create a new department object and set its fields
        Department newDepartment = new Department();
        newDepartment.setDepartmentName(departmentName);
        newDepartment.setManagerName(managerName);
        newDepartment.setPhoneNumber(phoneNumber);
        newDepartment.setNumberOfEmployees(numberOfEmployees);
        newDepartment.setBudget(budget);
        newDepartment.setCreatedDate(createdDate);
        newDepartment.setDescription(description);

        // Save the new department to the database
        departmentRepository.save(newDepartment);

        return ResponseEntity.status(HttpStatus.CREATED).body(newDepartment);
    }


    @PutMapping("/departments/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department updatedDepartment) {
        return departmentRepository.findById(id).map(department -> {
            department.setDepartmentName(updatedDepartment.getDepartmentName());
            department.setManagerName(updatedDepartment.getManagerName());
            department.setPhoneNumber(updatedDepartment.getPhoneNumber());
            department.setNumberOfEmployees(updatedDepartment.getNumberOfEmployees());
            department.setBudget(updatedDepartment.getBudget());
            department.setCreatedDate(updatedDepartment.getCreatedDate());
            department.setDescription(updatedDepartment.getDescription());

            Department savedDepartment = departmentRepository.save(department);
            return ResponseEntity.ok(savedDepartment);
        }).orElse(ResponseEntity.notFound().build());
    }


}
