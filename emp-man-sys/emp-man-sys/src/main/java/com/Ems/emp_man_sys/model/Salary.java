package com.Ems.emp_man_sys.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "salary")
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salary_id")
    private Long salaryId;


    @Column(name = "first_name", length = 100)
    private String firstname;

    @Column(name = "last_name", length = 50)
    private String lastname;



    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;

    @Column(name = "bonus", nullable = false)
    private Double bonus;

    @Column(name = "deductions", nullable = false)
    private Double deductions;

    @Column(name = "net_salary", nullable = false)
    private Double netSalary;

    @Column(name = "pay_date", nullable = false)
    private LocalDate payDate;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    // Getters and Setters

    public Long getSalaryId() {
        return salaryId;
    }

    public void setSalaryId(Long salaryId) {
        this.salaryId = salaryId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getBonus() {
        return bonus;
    }

    public void setBonus(Double bonus) {
        this.bonus = bonus;
    }

    public Double getDeductions() {
        return deductions;
    }

    public void setDeductions(Double deductions) {
        this.deductions = deductions;
    }

    public Double getNetSalary() {
        return netSalary;
    }

    public void setNetSalary(Double netSalary) {
        this.netSalary = netSalary;
    }

    public LocalDate getPayDate() {
        return payDate;
    }

    public void setPayDate(LocalDate payDate) {
        this.payDate = payDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
