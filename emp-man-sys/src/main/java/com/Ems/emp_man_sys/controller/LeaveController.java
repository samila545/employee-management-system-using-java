package com.Ems.emp_man_sys.controller;

import com.Ems.emp_man_sys.model.LeaveRecord;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class LeaveController {

    @Autowired
    private LeaveRecordRepository leaveRecordRepository;

    @GetMapping("/getEmployeeLeaves")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> getEmployeeLeaves() {
        List<LeaveRecord> employeeLeaves = leaveRecordRepository.findByEmployeeId(LoginController. loggedinId);
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
    @PostMapping("/applyLeave")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public String applyLeave(@RequestBody LeaveRecord leaveRecord) {


        if (leaveRecord.getLeaveType() == null || leaveRecord.getStartDate() == null || leaveRecord.getEndDate() == null) {
            return "Please provide all required details!";
        }


        // Set default status as "Pending" and save the leave record
        leaveRecord.setStatus("Pending");
        leaveRecord.setEmployeeId(LoginController.loggedinId);
        leaveRecordRepository.save(leaveRecord);


        return "Leave application submitted successfully!";
    }
    

    @GetMapping("/status")
    public ResponseEntity<Map<String, Long>> getLeaveStatus() {
        try {
            long leaveApplied = leaveRecordRepository.findByStatus("Applied").size();
            long leavePending = leaveRecordRepository.findByStatus("Pending").size();
            long leaveApproved = leaveRecordRepository.findByStatus("Approved").size();
            long leaveRejected = leaveRecordRepository.findByStatus("Rejected").size();

            Map<String, Long> leaveStats = new HashMap<>();
            leaveStats.put("leaveApplied", leaveApplied);
            leaveStats.put("leavePending", leavePending);
            leaveStats.put("leaveApproved", leaveApproved);
            leaveStats.put("leaveRejected", leaveRejected);

            return ResponseEntity.ok(leaveStats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
