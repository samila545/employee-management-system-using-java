package com.Ems.emp_man_sys.controller;

import com.Ems.emp_man_sys.model.Admin;
import com.Ems.emp_man_sys.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.DepartmentRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;

import java.util.HashMap;
import java.util.Map;


@RestController
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private LeaveRecordRepository leaveRecordRepository;

    @Autowired
    private DepartmentRepository departmentRepository;


    @PostMapping("/changeAdminPassword")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {

        // Get the logged-in admin email from the session
        String currentAdminEmail = LoginController.loggedinEmail;
        String currentAdminPassword = LoginController.loggedinPassword;





        if (currentAdminEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        // Fetch admin from the database
        Admin admin = adminRepository.findByEmailAddressAndPassword(currentAdminEmail, currentAdminPassword);

        if (admin == null) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Check if current password matches
        if (!admin.getPassword().equals(changePasswordRequest.getCurrentPassword())) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Update password
        admin.setPassword(changePasswordRequest.getNewPassword());
        adminRepository.save(admin);

        LoginController.loggedinPassword = changePasswordRequest.getNewPassword();

        return ResponseEntity.ok().body(Map.of("message", "Password changed successfully."));
    }

    @GetMapping("/totals")
    @CrossOrigin(origins = "http://127.0.0.1:5500") // Ensure correct path
    public Map<String, Integer> getDashboardTotals() {
        Map<String, Integer> dashboardData = new HashMap<>();

        System.out.println("i am in");

        dashboardData.put("totalEmployees", (int) employeeRepository.count());
        dashboardData.put("totalDepartments", (int) departmentRepository.count());
        dashboardData.put("totalManagers", (int) managerRepository.count());
        dashboardData.put("appliedLeaves", leaveRecordRepository.countByStatus("APPLIED"));
        dashboardData.put("approvedLeaves", leaveRecordRepository.countByStatus("APPROVED"));
        dashboardData.put("pendingLeaves", leaveRecordRepository.countByStatus("PENDING"));
        dashboardData.put("rejectedLeaves", leaveRecordRepository.countByStatus("REJECTED"));
        return dashboardData;
    }

    }

