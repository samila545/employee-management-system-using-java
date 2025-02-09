package com.Ems.emp_man_sys.controller;

import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;
import com.Ems.emp_man_sys.repository.DepartmentRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
// Ensure correct base URL
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private LeaveRecordRepository leaveRepository;

    @GetMapping("/totals") 
    @CrossOrigin(origins = "http://127.0.0.1:5500") // Ensure correct path
    public Map<String, Integer> getDashboardTotals() {
        Map<String, Integer> dashboardData = new HashMap<>();
        
        dashboardData.put("totalEmployees", (int) employeeRepository.count());
        dashboardData.put("totalDepartments", (int) departmentRepository.count());
        dashboardData.put("totalManagers", (int) managerRepository.count());

        dashboardData.put("appliedLeaves", leaveRepository.countByStatus("APPLIED"));
        dashboardData.put("approvedLeaves", leaveRepository.countByStatus("APPROVED"));
        dashboardData.put("pendingLeaves", leaveRepository.countByStatus("PENDING"));
        dashboardData.put("rejectedLeaves", leaveRepository.countByStatus("REJECTED"));

        return dashboardData;
    }
}
