package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.model.Manager;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Endpoint to get all managers
    @GetMapping("/getManagers")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Manager> getManagers() {
        return managerRepository.findAll();
    }

    @GetMapping("/getProfileofManager")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> getProfile(HttpSession session) {
        // Get the logged-in admin email from the session
        String currentManagerEmail = LoginController.loggedinEmail;
        String currentManagerPassword = LoginController.loggedinPassword;

        if (currentManagerEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        System.out.println(currentManagerEmail);

        // Fetch admin data from the database
        Manager manager = managerRepository.findByEmailAddressAndPassword(currentManagerEmail, currentManagerPassword);
        System.out.println(manager.getManagerId());



        // Return profile data
        return ResponseEntity.ok(manager);
    }


    @GetMapping("/getEmployeesByManager")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> getEmployeesByManager() {
        // Retrieve the logged-in manager's department
        String managerDepartment = LoginController.loggedindepartment;

        if (managerDepartment == null || managerDepartment.isEmpty()) {
            return ResponseEntity.status(400).body("Manager's department is not set.");
        }

        // Fetch employees by department
        List<Employee> employees = employeeRepository.findByDepartment(managerDepartment);

        if (employees.isEmpty()) {
            return ResponseEntity.status(404).body("No employees found for department: " + managerDepartment);
        }

        return ResponseEntity.ok(employees);
    }


    @PostMapping("/changeManagerPassword")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {

        // Get the logged-in admin email from the session
        String currentManagerEmail = LoginController.loggedinEmail;
        String currentManagerPassword = LoginController.loggedinPassword;





        if (currentManagerEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        // Fetch admin from the database
        Manager manager = managerRepository.findByEmailAddressAndPassword(currentManagerEmail, currentManagerPassword);

        if (manager == null) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Check if current password matches
        if (!manager.getPassword().equals(changePasswordRequest.getCurrentPassword())) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Update password
        manager.setPassword(changePasswordRequest.getNewPassword());
        managerRepository.save(manager);

        return ResponseEntity.ok().body(Map.of("message", "Password changed successfully."));
    }

}
