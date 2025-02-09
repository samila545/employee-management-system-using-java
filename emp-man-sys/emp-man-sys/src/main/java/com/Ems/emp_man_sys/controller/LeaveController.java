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
import java.util.Optional;

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

    @GetMapping("/getLeavesByManager")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> getLeavesByManager() {
        // Retrieve the logged-in manager's department
        String managerDepartment = LoginController.loggedindepartment;

        if (managerDepartment == null || managerDepartment.isEmpty()) {
            return ResponseEntity.status(400).body("Manager's department is not set.");
        }

        // Fetch leave records by employee department
        List<LeaveRecord> leaveRecords = leaveRecordRepository.findByEmployeeDepartment(managerDepartment);

        if (leaveRecords.isEmpty()) {
            return ResponseEntity.status(404).body("No leave records found for department: " + managerDepartment);
        }

        return ResponseEntity.ok(leaveRecords);
    }

    @PatchMapping("/{leaveId}/approve")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<LeaveRecord> approveLeave(@PathVariable Long leaveId) {
        // Find the leave record by leaveId
        LeaveRecord leave = leaveRecordRepository.findByLeaveId(leaveId);

            // Update the status to 'approved'
            leave.setStatus("Approved");
            LeaveRecord updatedLeave = leaveRecordRepository.save(leave); // Save the updated leave
            return ResponseEntity.ok(updatedLeave); // Return the updated leave with 200 OK

    }

    @PatchMapping("/rejectLeave/{leaveId}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<LeaveRecord> rejectLeave(@PathVariable Long leaveId) {
        // Find the leave record by leaveId
        LeaveRecord leave = leaveRecordRepository.findByLeaveId(leaveId);

        // Check if the leave exists
        if (leave == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if leave not found
        }

        // Update the status to 'Rejected'
        leave.setStatus("Rejected");

        // Save the updated leave
        LeaveRecord updatedLeave = leaveRecordRepository.save(leave);

        // Return the updated leave with 200 OK
        return ResponseEntity.ok(updatedLeave);
    }





}
