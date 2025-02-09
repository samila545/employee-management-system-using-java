package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.model.Manager;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;
import com.Ems.emp_man_sys.repository.DepartmentRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRecordRepository leaveRecordRepository;


    @GetMapping("/getManagers")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Manager> getManagers() {
        List<Manager> managers = managerRepository.findAll();


        return managers;
    }

    @GetMapping("/managers/{managerId}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long managerId) {
        System.out.println("Fetching manager with ID: " + managerId);
        return managerRepository.findByManagerId(managerId)
                .map(manager -> new ResponseEntity<>(manager, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
        System.out.println(manager.getImagePath());



        // Return profile data
        return ResponseEntity.ok(manager);
    }

    @DeleteMapping("/managers/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Void> deleteManager(@PathVariable Long id) {



        if (managerRepository.existsById(id)) {
            managerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
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

    @PutMapping("/managers/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Manager> updateManager(@PathVariable Long id, @RequestBody Manager updateManager) {
        return managerRepository.findById(id).map(manager -> {

            System.out.println(updateManager.getDateOfJoining());
            // Update manager details
            manager.setFirstName(updateManager.getFirstName());
            manager.setLastName(updateManager.getLastName());
            manager.setPhoneNumber(updateManager.getPhoneNumber());
            manager.setDateOfBirth(updateManager.getDateOfBirth());
            manager.setGender(updateManager.getGender());
            manager.setEmailAddress(updateManager.getEmailAddress());
            manager.setDepartment(updateManager.getDepartment());
            manager.setRole(updateManager.getRole());
            manager.setPosition(updateManager.getPosition());
            manager.setPassword(updateManager.getPassword());
            manager.setDateOfJoining(updateManager.getDateOfJoining());
            manager.setSalary(updateManager.getSalary());
            manager.setImagePath(updateManager.getImagePath());  // Corrected field name

            // Save updated manager
            Manager savedManager = managerRepository.save(manager);
            return ResponseEntity.ok(savedManager);
        }).orElse(ResponseEntity.notFound().build());  // Handle case where manager is not found
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

        LoginController.loggedinPassword = changePasswordRequest.getNewPassword();

        return ResponseEntity.ok().body(Map.of("message", "Password changed successfully."));
    }

    @GetMapping("/totalss")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Map<String, Long>> getEmployeeTotals() {
        Map<String, Long> totals = new HashMap<>();
        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();


        totals.put("totalEmployees", totalEmployees);
        totals.put("totalDepartments", totalDepartments);

        return ResponseEntity.ok(totals);
    }


}


