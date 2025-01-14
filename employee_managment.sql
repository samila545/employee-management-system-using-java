-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 10:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` bigint(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email_address`, `password`, `role`) VALUES
(1, 'Frezer', 'Takele', '1980-02-25', 'Male', '0911001234', 'frezer.takele@email.com', 'adminpassword1', 'Admin'),
(2, 'Sewit', 'Asfaw', '1975-09-12', 'Female', '0922002345', 'sewit.asfaw@email.com', 'adminpassword2', 'Admin'),
(3, 'Abel', 'Alemu', '1983-11-30', 'Male', '0933003456', 'abel.alemu@email.com', 'adminpassword3', 'Admin'),
(4, 'Selam', 'Girma', '1989-04-10', 'Female', '0944004567', 'selam.girma@email.com', 'adminpassword4', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(15) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(15) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `date_of_hiring` date DEFAULT NULL,
  `salary` varchar(30) DEFAULT NULL,
  `image_path` tinytext DEFAULT NULL,
  `position` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `first_name`, `last_name`, `phone_number`, `date_of_birth`, `gender`, `email_address`, `department`, `password`, `role`, `date_of_hiring`, `salary`, `image_path`, `position`) VALUES
(1, 'Tsegaye', 'Mekonnen', '0912345678', '1985-05-15', 'Male', 'tsegaye.mekonnen@email.com', 'IT', 'password123', 'Employee', '2010-03-01', '12000.50', '/images/tsegaye.jpg', 'Software Engineer'),
(2, 'Mulu', 'Addis', '0923456789', '1990-07-20', 'Female', 'mulu.addis@email.com', 'HR', 'password456', 'Employee', '2015-06-10', '15000.75', 'images/mulu.jpg', 'HR Manager'),
(3, 'Kebede', 'Birhanu', '0934567890', '1987-10-25', 'Male', 'kebede.birhanu@email.com', 'Finance', 'password789', 'Employee', '2018-01-12', '13000.20', 'images/kebede.jpg', 'Financial Analyst'),
(4, 'Genet', 'Wolde', '0945678901', '1992-03-30', 'Female', 'genet.wolde@email.com', 'Marketing', 'password101', 'Employee', '2020-11-05', '11000.30', 'images/genet.jpg', 'Marketing Specialist');

-- --------------------------------------------------------

--
-- Table structure for table `leave_record`
--

CREATE TABLE `leave_record` (
  `leave_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `leave_type` varchar(50) NOT NULL,
  `status` varchar(20) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `manager_id` bigint(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(15) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email_address` varchar(100) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'Manager',
  `date_of_joining` date NOT NULL,
  `salary` varchar(30) NOT NULL,
  `position` varchar(50) DEFAULT NULL,
  `image_path` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`manager_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email_address`, `department`, `password`, `role`, `date_of_joining`, `salary`, `position`, `image_path`) VALUES
(1, 'Kebede', 'Tadesse', '1978-06-15', 'Male', '0911223344', 'kebede.tadesse@email.com', 'Sales', 'managerpassword1', 'Manager', '2010-03-01', '35000.00', 'Sales Manager', '/images/kebede_tadesse.jpeg'),
(2, 'Mulu', 'Desta', '1984-07-20', 'Female', '0922334455', 'mulu.desta@email.com', 'IT', 'managerpassword2', 'Manager', '2012-05-12', '40000.00', 'IT Manager', '/images/mulu_desta.jpg'),
(3, 'Hassan', 'Mohammed', '1982-01-05', 'Male', '0933445566', 'hassan.mohammed@email.com', 'HR', 'managerpassword3', 'Manager', '2015-11-20', '38000.00', 'HR Manager', '/images/hassan_mohammed.jpg'),
(4, 'Aster', 'Mekonnen', '1990-09-30', 'Female', '0944556677', 'aster.mekonnen@email.com', 'Finance', 'managerpassword4', 'Manager', '2016-09-22', '42000.00', 'Finance Manager', '/images/aster_mekonnen.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `salary_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `basic_salary` decimal(10,2) NOT NULL,
  `bonus` decimal(10,2) DEFAULT 0.00,
  `deductions` decimal(10,2) DEFAULT 0.00,
  `pay_date` date NOT NULL,
  `net_salary` decimal(10,2) GENERATED ALWAYS AS (`basic_salary` + `bonus` - `deductions`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email_address` (`email_address`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `leave_record`
--
ALTER TABLE `leave_record`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `fk_leave_employee` (`employee_id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`manager_id`),
  ADD UNIQUE KEY `email_address` (`email_address`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`salary_id`),
  ADD KEY `fk_employee` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leave_record`
--
ALTER TABLE `leave_record`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `manager_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `salary_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leave_record`
--
ALTER TABLE `leave_record`
  ADD CONSTRAINT `fk_leave_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `fk_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
