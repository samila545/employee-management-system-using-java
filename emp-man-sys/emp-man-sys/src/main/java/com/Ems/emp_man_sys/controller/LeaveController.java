package com.Ems.emp_man_sys.controller;

import com.Ems.emp_man_sys.model.LeaveRecord;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class LeaveController {

    @Autowired
    private LeaveRecordRepository leaveRecordRepository;

    @GetMapping("/getEmployeeLeaves")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> getEmployeeLeaves() {
        List<LeaveRecord> employeeLeaves = leaveRecordRepository.findByEmployeeId(LoginController.loggedinId);
        return ResponseEntity.ok(employeeLeaves);
    }

    // Get all leave records or filter by status
    @GetMapping("/leaves")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> getLeaveRecords(@RequestParam(value = "status", required = false) String status) {
        List<LeaveRecord> leaves;
        if (status != null && !status.isEmpty()) {
            leaves = leaveRecordRepository.findByStatus(status);
        } else {
            leaves = leaveRecordRepository.findAll();
        }
        return ResponseEntity.ok(leaves);
    }

    // Apply for a new leave
    @PostMapping("/apply")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> applyLeave(@RequestBody LeaveRecord leaveRecord) {
        LeaveRecord savedLeave = leaveRecordRepository.save(leaveRecord);
        return ResponseEntity.ok(savedLeave);
    }
}
