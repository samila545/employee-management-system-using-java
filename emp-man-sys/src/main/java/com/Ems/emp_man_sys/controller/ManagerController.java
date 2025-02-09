package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.model.Manager;
import com.Ems.emp_man_sys.repository.DepartmentRepository;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ManagerController {
    @Autowired  
    private DepartmentRepository departmentRepository;
    
    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRecordRepository leaveRecordRepository;


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

    @PutMapping("/updateToManager")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<String> updateToManager(@RequestBody Employee updatedEmployee) {
        System.out.println("we did it");
        System.out.println(updatedEmployee.getEmployeeId()+"hiiiiuuu");
        System.out.println(updatedEmployee.getFirstName()+"not");

        return employeeRepository.findByEmployeeId(updatedEmployee.getEmployeeId()).map(employee -> {
            // Create new Manager from Employee data

            System.out.println(updatedEmployee.getEmployeeId()+"hiiiiuuu");
            Manager newManager = new Manager();
            newManager.setFirstName(updatedEmployee.getFirstName());
            newManager.setLastName(updatedEmployee.getLastName());
            newManager.setEmailAddress(updatedEmployee.getEmailAddress());
            newManager.setDepartment(updatedEmployee.getDepartment());
            newManager.setPosition(updatedEmployee.getPosition()); // Promote to Manager
            newManager.setRole("MANAGER"); // Assign role as Manager
            newManager.setSalary(updatedEmployee.getSalary());
            newManager.setPhoneNumber(updatedEmployee.getPhoneNumber());
            newManager.setDateOfBirth(updatedEmployee.getDateOfBirth());
            newManager.setGender(updatedEmployee.getGender());
            newManager.setPassword(updatedEmployee.getPassword());
            newManager.setDateOfJoining(updatedEmployee.getDateOfHiring());
            newManager.setImagePath(updatedEmployee.getImage_path());

            // Save new Manager
            managerRepository.save(newManager);

            leaveRecordRepository.deleteByEmployeeId(updatedEmployee.getEmployeeId());
            // Delete Employee from Employee Table
            employeeRepository.deleteById(updatedEmployee.getEmployeeId());

            return ResponseEntity.ok("Employee promoted to Manager and removed from Employees table.");
        }).orElseGet(() -> {
            // Return a meaningful response with an error message if not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Employee with ID " + updatedEmployee.getEmployeeId() + " not found.");
        });

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
     @GetMapping("/totalss")
    public ResponseEntity<Map<String, Long>> getEmployeeTotals() {
        Map<String, Long> totals = new HashMap<>();

        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();
       /*long totalEmployeesInDepartment = employeeRepository.countEmployeesInDepartment(departmentName); // Custom Query
        totals.put("totalEmployeesInDepartment", totalEmployeesInDepartment); */
        
        totals.put("totalEmployees", totalEmployees);
        totals.put("totalDepartments", totalDepartments);
       

        return ResponseEntity.ok(totals);
    }

}
