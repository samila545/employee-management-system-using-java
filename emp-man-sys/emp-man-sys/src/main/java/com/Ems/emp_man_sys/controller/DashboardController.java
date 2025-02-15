package com.Ems.emp_man_sys.controller;

import com.Ems.emp_man_sys.repository.EmployeeRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;



    @GetMapping("/getDashboardData")
    public Map<String, Integer> getDashboardData() {
        Map<String, Integer> dashboardData = new HashMap<>();
        dashboardData.put("employeeCount", (int)employeeRepository.count());

        // Add more data as needed
        return dashboardData;
    }


    /* @Autowired
        private StatisticsRepository statisticsRepository;
    */


    }




