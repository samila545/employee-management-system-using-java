package com.Ems.emp_man_sys.repository;

import com.Ems.emp_man_sys.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
  List<Department> findByManagerName(String managerName);
}
