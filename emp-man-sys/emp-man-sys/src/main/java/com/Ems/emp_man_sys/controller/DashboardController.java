package com.Ems.emp_man_sys.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ems.emp_man_sys.repository.DepartmentRepository;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.ManagerRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping("/totals")
    public ResponseEntity<Map<String, Long>> getDashboardTotals() {
        Map<String, Long> totals = new HashMap<>();
        try {
            long totalEmployees = employeeRepository.count();
            long totalManagers = managerRepository.count();
            long totalDepartments = departmentRepository.count();

            totals.put("totalEmployees", totalEmployees);
            totals.put("totalManagers", totalManagers);
            totals.put("totalDepartments", totalDepartments);

            return ResponseEntity.ok(totals);
        } catch (Exception e) {
            System.err.println("Error fetching dashboard totals: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

    