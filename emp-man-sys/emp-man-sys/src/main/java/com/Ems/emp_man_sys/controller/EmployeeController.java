package com.Ems.emp_man_sys.controller;


import com.Ems.emp_man_sys.model.Admin;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ems.emp_man_sys.model.Employee;
import com.Ems.emp_man_sys.repository.EmployeeRepository;
import com.Ems.emp_man_sys.repository.LeaveRecordRepository;
import org.springframework.web.multipart.MultipartFile;
import com.Ems.emp_man_sys.repository.DepartmentRepository;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRecordRepository leaveRecordRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping("/getEmployees")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    // Endpoint to get employee by ID
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long employeeId) {
        // Search employee by ID
        System.out.println("i am in");
        return employeeRepository.findByEmployeeId(employeeId)
                .map(employee -> new ResponseEntity<>(employee, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // If not found, return 404
    }


    @PostMapping("/addEmployee")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Employee> addEmployee(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("dateOfBirth") LocalDate dateOfBirth,
            @RequestParam("gender") String gender,
            @RequestParam("emailAddress") String emailAddress,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "position", required = false) String position,
            @RequestParam("salary") String salary,
            @RequestParam(value = "image", required = false) String image,
            @RequestParam(value = "password", required = false) String password) {
        // Create a new employee object and set its fields
        Employee newEmployee = new Employee();
        newEmployee.setFirstName(firstName);
        newEmployee.setLastName(lastName);
        newEmployee.setPhoneNumber(phoneNumber);
        newEmployee.setDateOfBirth(dateOfBirth);
        newEmployee.setGender(gender);
        newEmployee.setEmailAddress(emailAddress);
        newEmployee.setDepartment(department);
        newEmployee.setRole(role);
        newEmployee.setPosition(position);
        newEmployee.setSalary(salary);
        newEmployee.setPassword(password);

        // Save the new employee to the database
        employeeRepository.save(newEmployee);

        return ResponseEntity.status(HttpStatus.CREATED).body(newEmployee);
    }



    @GetMapping("/getProfile")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> getProfile(HttpSession session) {
        // Get the logged-in admin email from the session
        String currentEmployeeEmail = LoginController.loggedinEmail;
        String currentEmployeePassword = LoginController.loggedinPassword;

        System.out.println(currentEmployeeEmail);
        System.out.println(currentEmployeePassword);

        if (currentEmployeeEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        // Fetch admin data from the database
        Employee employee = employeeRepository.findByEmailAddressAndPassword(currentEmployeeEmail, currentEmployeePassword);

        if (employee == null) {
            return ResponseEntity.status(404).body("Admin profile not found.");
        }

        // Return profile data
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/changeEmployeePassword")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {

        // Get the logged-in admin email from the session
        String currentEmployeeEmail = LoginController.loggedinEmail;
        String currentEmployeePassword = LoginController.loggedinPassword;





        if (currentEmployeeEmail == null) {
            return ResponseEntity.status(401).body("Unauthorized. Please log in.");
        }

        // Fetch admin from the database
        Employee employee = employeeRepository.findByEmailAddressAndPassword(currentEmployeeEmail, currentEmployeePassword);

        if (employee == null) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Check if current password matches
        if (!employee.getPassword().equals(changePasswordRequest.getCurrentPassword())) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Update password
        employee.setPassword(changePasswordRequest.getNewPassword());
        employeeRepository.save(employee);

        LoginController.loggedinPassword = changePasswordRequest.getNewPassword();

        return ResponseEntity.ok().body(Map.of("message", "Password changed successfully."));
    }

    @PutMapping("/employees/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        return employeeRepository.findById(id).map(employee -> {
            employee.setFirstName(updatedEmployee.getFirstName());
            employee.setLastName(updatedEmployee.getLastName());
            employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
            employee.setDateOfBirth(updatedEmployee.getDateOfBirth());
            employee.setGender(updatedEmployee.getGender());
            employee.setEmailAddress(updatedEmployee.getEmailAddress());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setRole(updatedEmployee.getRole());
            employee.setPosition(updatedEmployee.getPosition());
            employee.setPassword(updatedEmployee.getPassword());
            employee.setDateOfHiring(updatedEmployee.getDateOfHiring());
            employee.setSalary(updatedEmployee.getSalary());
            employee.setImage_path(updatedEmployee.getImage_path());

            Employee savedEmployee = employeeRepository.save(employee);
            return ResponseEntity.ok(savedEmployee);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete Employee
    @DeleteMapping("/employees/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {

        leaveRecordRepository.deleteByEmployeeId(id);

        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/total")
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
    public ResponseEntity<Map<String, Long>> getEmployeeTotals() {
        Map<String, Long> totals = new HashMap<>();
        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();
       /*long totalEmployeesInDepartment = employeeRepository.countEmployeesInDepartment(departmentName); // Custom Query
        totals.put("totalEmployeesInDepartment", totalEmployeesInDepartment); */

        totals.put("totalEmployees", totalEmployees);
        totals.put("totalDepartments", totalDepartments);

        return ResponseEntity.ok(totals);
    }
}



