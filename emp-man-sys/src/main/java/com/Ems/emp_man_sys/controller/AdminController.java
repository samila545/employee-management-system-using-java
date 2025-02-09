package com.Ems.emp_man_sys.controller;

import com.Ems.emp_man_sys.model.Admin;
import com.Ems.emp_man_sys.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.Map;


@RestController
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

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

        return ResponseEntity.ok().body(Map.of("message", "Password changed successfully."));
    }
    }

