package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Admin;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.repository.EmployeeRepository;


import java.util.List;
import java.util.Map;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/getEmployees")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/getProfile")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> getProfile(HttpSession session) {
        // Get the logged-in admin email from the session
        String currentEmployeeEmail = LoginController.loggedinEmail;
        String currentEmployeePassword = LoginController.loggedinPassword;

        if (currentEmployeeEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        // Fetch admin data from the database
        Employee employee = employeeRepository.findByEmailAddressAndPassword(currentEmployeeEmail, currentEmployeePassword);

        if (employee == null) {
            return ResponseEntity.status(404).body("Admin profile not found.");
        }

        // Return profile data
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/changeEmployeePassword")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {

        // Get the logged-in admin email from the session
        String currentEmployeeEmail = LoginController.loggedinEmail;
        String currentEmployeePassword = LoginController.loggedinPassword;





        if (currentEmployeeEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        // Fetch admin from the database
        Employee employee = employeeRepository.findByEmailAddressAndPassword(currentEmployeeEmail, currentEmployeePassword);

        if (employee == null) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Check if current password matches
        if (!employee.getPassword().equals(changePasswordRequest.getCurrentPassword())) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Update password
        employee.setPassword(changePasswordRequest.getNewPassword());
        employeeRepository.save(employee);

        return ResponseEntity.ok().body(Map.of("message", "Password changed successfully."));
    }


}
