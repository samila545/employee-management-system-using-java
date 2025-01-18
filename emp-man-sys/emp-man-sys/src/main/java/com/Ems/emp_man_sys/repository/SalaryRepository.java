package com.Ems.emp_man_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ems.emp_man_sys.model.Salary;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
    Salary findBysalaryId(Long id);
}
