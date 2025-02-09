package com.Ems.emp_man_sys.repository;

import com.Ems.emp_man_sys.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ems.emp_man_sys.model.Manager;

import java.util.Optional;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {
     Manager findByEmailAddressAndPassword(String email, String password);

     Optional<Manager> findByManagerId(Long managerId);
}
