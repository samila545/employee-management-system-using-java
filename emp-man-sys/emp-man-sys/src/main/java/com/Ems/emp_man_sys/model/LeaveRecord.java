package com.Ems.emp_man_sys.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "leave_record")
public class LeaveRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int leaveId;

    @Column(name = "employee_id")
    private Long employeeId;


    @Column(name = "start_date")
    private Date startDate;


    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "leave_type", length = 50)
    private String leaveType;

    @Column(name = "status", length = 20)
    private String status;

    // Getters and Setters
    public int getLeaveId() {
        return leaveId;
    }

    public void setLeaveId(int leaveId) {
        this.leaveId = leaveId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
