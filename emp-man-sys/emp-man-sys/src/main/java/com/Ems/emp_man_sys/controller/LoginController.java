package com.Ems.emp_man_sys.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.Ems.emp_man_sys.model.Admin;
import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.model.Manager;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import com.Ems.emp_man_sys.repository.AdminRepository;

@RestController
public class LoginController {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginDetails) {
        String email = loginDetails.get("username");
        String password = loginDetails.get("password");

        // Check for Admin first
        Admin admin = adminRepository.findByEmailAddressAndPassword(email, password);
        if (admin != null) {
            // Return admin details
            Map<String, String> adminResponse = Map.of(
                    "role", "admin",
                    "firstName", admin.getFirstName(),
                    "lastName", admin.getLastName()
            );
            return ResponseEntity.ok(adminResponse);
        }

        // Check for Manager (if applicable)
        Manager manager = managerRepository.findByEmailAddressAndPassword(email, password);
        if (manager != null) {
            Map<String, String> managerResponse = Map.of(
                    "role", "manager",
                    "firstName", manager.getFirstName(),
                    "lastName", manager.getLastName(),
                    "image", manager.getImagePath()
            );
            return ResponseEntity.ok(managerResponse);
        }

        // Check for Employee
        Employee employee = employeeRepository.findByEmailAddressAndPassword(email, password);
        if (employee != null) {
            Map<String, String> employeeResponse = Map.of(
                    "role", "employee",
                    "firstName", employee.getFirstName(),
                    "lastName", employee.getLastName(),
                    "image", employee.getImage_path() // Ensure the Employee entity has a field for the image path
            );
            return ResponseEntity.ok(employeeResponse);
        }

        // Invalid credentials
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
