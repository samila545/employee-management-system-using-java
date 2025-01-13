package com.Ems.emp_man_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ems.emp_man_sys.model.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Manager findByEmailAddressAndPassword(String email, String password);
}
