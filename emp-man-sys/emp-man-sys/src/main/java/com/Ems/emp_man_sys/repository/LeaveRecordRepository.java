package com.Ems.emp_man_sys.repository;

import com.Ems.emp_man_sys.model.LeaveRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRecordRepository extends JpaRepository<LeaveRecord, Integer> {

    // Find all leave records by status
    List<LeaveRecord> findByStatus(String status);

    // Find all leave records for a specific employee
    List<LeaveRecord> findByEmployeeId(Long employeeId);
}
