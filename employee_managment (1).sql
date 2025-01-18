-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2025 at 08:45 PM
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
(1, 'Frezer', 'Takele', '1980-02-25', 'Male', '0911001234', 'frezer.takele@email.com', '1212', 'Admin'),
(2, 'Sewit', 'Asfaw', '1975-09-12', 'Female', '0922002345', 'sewit.asfaw@email.com', 'adminpassword2', 'Admin'),
(3, 'Abel', 'Alemu', '1983-11-30', 'Male', '0933003456', 'abel.alemu@email.com', 'adminpassword3', 'Admin'),
(4, 'Selam', 'Girma', '1989-04-10', 'Female', '0944004567', 'selam.girma@email.com', 'adminpassword4', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` bigint(20) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `manager_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `number_of_employees` int(11) DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`, `manager_name`, `phone_number`, `number_of_employees`, `budget`, `created_date`, `description`) VALUES
(1, 'Finance', 'Kebede Tadese', '0911223344', 20, 500000.00, '2023-01-04', 'Manages company finances and accounts.'),
(2, 'IT', '', NULL, NULL, 200000.00, NULL, 'Oversees recruitment and employee welfare.'),
(3, '', '', NULL, NULL, 800000.00, NULL, 'Handles technology and IT infrastructure.'),
(4, '', '', NULL, NULL, 400000.00, NULL, 'Focuses on advertising and customer engagement.');

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
(4, 'Genet', 'Wolde', '0945678901', '1992-03-30', 'Female', 'genet.wolde@email.com', 'Marketing', 'password101', 'Employee', '2020-11-05', '11000.30', 'images/genet.jpg', 'Marketing Specialist'),
(5, 'John', 'Doe', '1234567890', '1990-05-15', 'Male', 'johndoe@example.com', 'IT', 'password123', 'Manager', '2020-03-01', '50000', '/images/john.jpg', NULL),
(6, 'Jane', 'Smith', '0987654321', '1988-09-25', 'Female', 'janesmith@example.com', 'HR', 'securepass', 'HR Manager', '2019-08-15', '45000', '/images/jane.jpg', NULL),
(7, 'Robert', 'Brown', '1231231234', '1995-07-12', 'Male', 'robertbrown@example.com', 'Finance', 'robert@123', 'Accountant', '2021-11-20', '40000', '/images/robert.jpg', NULL),
(8, 'Emily', 'Johnson', '3213214321', '1992-03-30', 'Female', 'emilyjohnson@example.com', NULL, 'emily2023', 'Developer', '2022-05-12', '55000', '/images/emily.jpg', NULL),
(9, 'Michael', 'Williams', '4564567890', '1985-01-22', 'Male', 'michaelwilliams@example.com', 'Marketing', 'mike@pass', 'Team Lead', '2018-09-01', '48000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leave_record`
--

CREATE TABLE `leave_record` (
  `leave_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `leave_type` varchar(50) NOT NULL,
  `status` varchar(20) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_record`
--

INSERT INTO `leave_record` (`leave_id`, `employee_id`, `start_date`, `end_date`, `leave_type`, `status`) VALUES
(1, 1, '2025-01-10 00:00:00.000000', '2025-01-15 00:00:00.000000', 'Sick Leave', 'Approved'),
(2, 2, '2025-02-01 00:00:00.000000', '2025-02-05 00:00:00.000000', 'Vacation', 'Pending'),
(3, 3, '2025-03-15 00:00:00.000000', '2025-03-20 00:00:00.000000', 'Maternity Leave', 'Approved'),
(4, 4, '2025-04-10 00:00:00.000000', '2025-04-12 00:00:00.000000', 'Paternity Leave', 'Rejected'),
(5, 5, '2025-05-01 00:00:00.000000', '2025-05-03 00:00:00.000000', 'Emergency Leave', 'Approved'),
(6, 1, '2025-06-10 00:00:00.000000', '2025-06-20 00:00:00.000000', 'Vacation', 'Pending'),
(7, 2, '2025-07-05 00:00:00.000000', '2025-07-10 00:00:00.000000', 'Sick Leave', 'Approved'),
(8, 3, '2025-08-01 00:00:00.000000', '2025-08-07 00:00:00.000000', 'Annual Leave', 'Pending'),
(9, 4, '2025-09-10 00:00:00.000000', '2025-09-15 00:00:00.000000', 'Compassionate Leave', 'Approved'),
(10, 5, '2025-10-01 00:00:00.000000', '2025-10-03 00:00:00.000000', 'Vacation', 'Rejected');

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
(1, 'Kebede', 'Tadesse', '1978-06-15', 'Male', '0911223344', 'kebede.tadesse@email.com', 'Finance', 'managerpassword1', 'Manager', '2010-03-01', '35000.00', 'Sales Manager', '/images/kebede_tadesse.jpeg'),
(2, 'Mulu', 'Desta', '1984-07-20', 'Female', '0922334455', 'mulu.desta@email.com', 'IT', 'managerpassword2', 'Manager', '2012-05-12', '40000.00', 'IT Manager', '/images/mulu_desta.jpg'),
(3, 'Hassan', 'Mohammed', '1982-01-05', 'Male', '0933445566', 'hassan.mohammed@email.com', 'HR', 'managerpassword3', 'Manager', '2015-11-20', '38000.00', 'HR Manager', '/images/hassan_mohammed.jpg'),
(4, 'Aster', 'Mekonnen', '1990-09-30', 'Female', '0944556677', 'aster.mekonnen@email.com', 'Finance', 'managerpassword4', 'Manager', '2016-09-22', '42000.00', 'Finance Manager', '/images/aster_mekonnen.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `salary_id` bigint(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `basic_salary` double NOT NULL,
  `bonus` double NOT NULL,
  `deductions` double NOT NULL,
  `pay_date` date NOT NULL,
  `net_salary` double NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`salary_id`, `first_name`, `last_name`, `basic_salary`, `bonus`, `deductions`, `pay_date`, `net_salary`, `status`) VALUES
(1, 'Alice', 'Tadesse', 5000, 200, 100, '2025-01-01', 5100, 'Paid'),
(2, 'Bob', 'Addis', 8000, 500, 200, '2025-01-01', 8300, 'Paid'),
(3, 'Charlie', 'Mekonnen', 4500, 150, 200, '2025-01-01', 4450, 'Pending'),
(4, 'Diana', 'ddd', 9000, 1000, 300, '2025-01-01', 9700, 'Paid'),
(5, 'Eve', 'eeee', 6000, 300, 150, '2025-02-01', 6150, 'Paid');

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
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

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
  ADD PRIMARY KEY (`salary_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `leave_record`
--
ALTER TABLE `leave_record`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `manager_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `salary_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leave_record`
--
ALTER TABLE `leave_record`
  ADD CONSTRAINT `fk_leave_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
