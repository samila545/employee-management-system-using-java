package com.Ems.emp_man_sys.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Ems.emp_man_sys.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByEmailAddressAndPassword(String email, String password);

    List<Employee> findByDepartment(String department);

    Optional<Employee> findByEmployeeId(Long employeeId);


}
