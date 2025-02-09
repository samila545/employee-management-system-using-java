document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.side-bar li');
    const contentSections = document.querySelectorAll('.middle_view .content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove the active class from all sidebar items
            sidebarItems.forEach(el => el.classList.remove('active'));

            // Add the active class to the clicked item
            item.classList.add('active');

            // Get the target content section
            const target = item.getAttribute('data-target');

            // Hide all content sections
            contentSections.forEach(section => section.style.display = 'none');

            // Show the selected content section
            document.querySelector(`.content.${target}`).style.display = 'block';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const employeesButton = document.querySelector(".side-bar li:nth-child(2)"); // "Employees" sidebar button
    const managersButton = document.querySelector(".side-bar li:nth-child(3)"); // "Managers" sidebar button
    const departmentsButton = document.querySelector(".side-bar li:nth-child(4)"); // "departments" sidebar button
    const SalaryButton = document.querySelector(".side-bar li:nth-child(5)"); // "salary" sidebar button

    const middleView = document.querySelector(".middle_view"); // Main content area

    fetchAnnouncements();
    
    function fetchAnnouncements() {
        fetch('http://localhost:8080/getAnnouncements')
            .then(response => response.json())
            .then(announcements => {
                const announcementList = document.querySelector('.announcement-list ul');
                announcementList.innerHTML = announcements.map(announcement => `
                    <li>
                        <strong>${announcement.title}:</strong> ${announcement.content}
                        <span class="date">Posted on: ${new Date(announcement.postedDate).toLocaleDateString()}</span>
                    </li>
                `).join('');
            })
            .catch(error => console.error('Error fetching announcements:', error));
    }


    // Handle form submission to create a new announcement
const announcementForm = document.getElementById('announcementForm');
announcementForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;

    // Check if title and content are provided
    if (title && content) {
        // Prepare the data to be sent to the server
        const newAnnouncement = {
            title: title,
            content: content
        };

        // Send POST request to create a new announcement
        fetch('http://localhost:8080/createAnnouncement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnnouncement)
        })
        .then(response => response.json())
        .then(data => {
            // After successfully posting, fetch and display the updated announcements
            fetchAnnouncements();
            // Clear the form fields after posting
            announcementForm.reset();
        })
        .catch(error => console.error('Error posting announcement:', error));
    } else {
        alert('Please fill in both the title and content');
    }
});


    // Handle Employees Button Click
    employeesButton.addEventListener("click", () => {
        fetch("http://localhost:8080/getEmployees")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Clear existing content
                middleView.innerHTML = `
                <div>
                    <h1>Employee List</h1>
                    <div>
                        <input type="number" id="searchEmployeeId" placeholder="Search employee by ID">
                        <button id="searchEmployeeBtn">Search</button>
                        <button id="addEmployeeBtn">Add New Employee</button>
                    </div>
                </div>
                `;
    
                // Create a table
                const table = document.createElement("table");
                table.style.width = "100%";
                table.style.borderCollapse = "collapse";
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Position</th>
                            <th>Password</th>
                            <th>Date of Hiring</th>
                            <th>Salary</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(employee => `
                            <tr data-employee='${JSON.stringify(employee)}'>
                                <td>${employee.employeeId}</td>
                                <td>${employee.firstName}</td>
                                <td>${employee.lastName}</td>
                                <td>${employee.phoneNumber}</td>
                                <td>${employee.dateOfBirth}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.emailAddress}</td>
                                <td>${employee.department || "N/A"}</td>
                                <td>${employee.role || "N/A"}</td>
                                <td>${employee.position || "N/A"}</td>
                                <td>${employee.password || "N/A"}</td>
                                <td>${employee.dateOfHiring || "N/A"}</td>
                                <td>${employee.salary || "N/A"}</td>
                                <td>
                                    ${employee.image_path ? `<img src="http://localhost:8080/${employee.image_path}" alt="Employee Image" style="width: 50px; height: 50px;">` : "N/A"}
                                </td>
                                <td>
                                    <button class="edit-btn" data-id="${employee.employeeId}">Edit</button>
                                    <button class="delete-btn" data-id="${employee.employeeId}">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;
    
                middleView.appendChild(table);
    
                // ✅ Attach event listeners AFTER table is added
                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.addEventListener("click", openEditForm);
                });
    
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", deleteEmployee);
                });


                const addEmployeeBtn = document.getElementById("addEmployeeBtn");
               addEmployeeBtn.addEventListener("click", () => {
                   // Create a form to add new employee
                   middleView.innerHTML = `
                       <div>
                           <h1>Add New Employee</h1>
                           <form id="addEmployeeForm">
                               <label for="firstName">First Name:</label>
                               <input type="text" id="firstName" name="firstName" required><br><br>
                               
                               <label for="lastName">Last Name:</label>
                               <input type="text" id="lastName" name="lastName" required><br><br>
                               
                               <label for="phoneNumber">Phone Number:</label>
                               <input type="text" id="phoneNumber" name="phoneNumber" required><br><br>
                               
                               <label for="dateOfBirth">Date of Birth:</label>
                               <input type="date" id="dateOfBirth" name="dateOfBirth" required><br><br>
                               
                               <label for="gender">Gender:</label>
                               <select id="gender" name="gender" required>
                                   <option value="Male">Male</option>
                                   <option value="Female">Female</option>
                                   <option value="Other">Other</option>
                               </select><br><br>
                               
                               <label for="emailAddress">Email:</label>
                               <input type="email" id="emailAddress" name="emailAddress" required><br><br>
                               
                               <label for="department">Department:</label>
                               <input type="text" id="department" name="department"><br><br>
                               
                               <label for="role">Role:</label>
                               <input type="text" id="role" name="role"><br><br>
                               
                               <label for="position">Position:</label>
                               <input type="text" id="position" name="position"><br><br>
                               
                               <label for="salary">Salary:</label>
                               <input type="number" id="salary" name="salary" required><br><br>
                               
                               <label for="image">Employee Image-path:</label>
                               <input type="text" id="image" name="image"><br><br>

                               <label for="password">Employee password:</label>
                               <input type="text" id="password" name="password"><br><br>
                               
                               <button type="submit">Add Employee</button>
                            </form>
                           <button id="backToEmployees">Back to Employee List</button>
                       </div>
                   `;
               
                   // Back to Employee List functionality
                   document.getElementById("backToEmployees").addEventListener("click", function () {
                       employeesButton.click(); // Reload full employee list
                   });
               
                   // Handle form submission
                   document.getElementById("addEmployeeForm").addEventListener("submit", function (event) {
                       event.preventDefault(); // Prevent form from submitting normally
                       
                       const formData = new FormData();
                       formData.append("firstName", document.getElementById("firstName").value);
                       formData.append("lastName", document.getElementById("lastName").value);
                       formData.append("phoneNumber", document.getElementById("phoneNumber").value);
                       formData.append("dateOfBirth", document.getElementById("dateOfBirth").value);
                       formData.append("gender", document.getElementById("gender").value);
                       formData.append("emailAddress", document.getElementById("emailAddress").value);
                       formData.append("department", document.getElementById("department").value);
                       formData.append("role", document.getElementById("role").value);
                       formData.append("position", document.getElementById("position").value);
                       formData.append("salary", document.getElementById("salary").value);
                       formData.append("image", document.getElementById("image").value);
                       formData.append("password", document.getElementById("password").value);
               
                       // Send the data to the backend (assuming the backend endpoint is /addEmployee)
                       fetch("http://localhost:8080/addEmployee", {
                           method: "POST",
                           body: formData,
                       })
                           .then(response => {
                               if (!response.ok) {
                                   throw new Error("Failed to add employee");
                               }
                               return response.json();
                           })
                           .then(data => {
                               alert("Employee added successfully!");
                               employeesButton.click(); // Reload employee list after adding
                           })
                           .catch(error => {
                               console.error("Error:", error);
                               alert("There was an error adding the employee.");
                           });
                   });
               });

                const searchEmployeeBtn = document.getElementById("searchEmployeeBtn");
                if (searchEmployeeBtn) {
                    searchEmployeeBtn.addEventListener("click", function () {
                        const employeeId = document.getElementById("searchEmployeeId").value.trim();
                
                        if (!employeeId) {
                            alert("Please enter an Employee ID to search.");
                            return;
                        }
                
                        fetch(`http://localhost:8080/employees/${employeeId}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Employee not found");
                                }
                                return response.json();
                            })
                            .then(employee => {
                                // Display the searched employee in the table
                                middleView.innerHTML = `
                                <div>
                                    <h1>Search Result</h1>
                                    <button id="backToEmployees">Back to Employee List</button>
                                    <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
                                        <thead>
                                            <tr style="border: 1px solid black;">
                                                <th style="border: 1px solid black; padding: 8px;">ID</th>
                                                <th style="border: 1px solid black; padding: 8px;">First Name</th>
                                                <th style="border: 1px solid black; padding: 8px;">Last Name</th>
                                                <th style="border: 1px solid black; padding: 8px;">Phone</th>
                                                <th style="border: 1px solid black; padding: 8px;">Date of Birth</th>
                                                <th style="border: 1px solid black; padding: 8px;">Gender</th>
                                                <th style="border: 1px solid black; padding: 8px;">Email</th>
                                                <th style="border: 1px solid black; padding: 8px;">Department</th>
                                                <th style="border: 1px solid black; padding: 8px;">Role</th>
                                                <th style="border: 1px solid black; padding: 8px;">Position</th>
                                                <th style="border: 1px solid black; padding: 8px;">Password</th>
                                                <th style="border: 1px solid black; padding: 8px;">Date of Hiring</th>
                                                <th style="border: 1px solid black; padding: 8px;">Salary</th>
                                                <th style="border: 1px solid black; padding: 8px;">Image</th>
                                                <th style="border: 1px solid black; padding: 8px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr data-employee='${JSON.stringify(employee)}'>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.employeeId}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.firstName}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.lastName}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.phoneNumber}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.dateOfBirth}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.gender}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.emailAddress}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.department || "N/A"}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.role || "N/A"}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.position || "N/A"}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.password || "N/A"}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.dateOfHiring || "N/A"}</td>
                                                <td style="border: 1px solid black; padding: 8px;">${employee.salary || "N/A"}</td>
                                                <td style="border: 1px solid black; padding: 8px;">
                                                    ${employee.image_path ? `<img src="http://localhost:8080/${employee.image_path}" alt="Employee Image" style="width: 50px; height: 50px;">` : "N/A"}
                                                </td>
                                                <td style="border: 1px solid black; padding: 8px;">
                                                    <button class="edit-btn" data-id="${employee.employeeId}">Edit</button>
                                                    <button class="delete-btn" data-id="${employee.employeeId}">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            `;
                            


                
                                // Attach event listeners for Edit and Delete buttons
                                document.querySelector(".edit-btn").addEventListener("click", openEditForm);
                                document.querySelector(".delete-btn").addEventListener("click", deleteEmployee);
                
                                // Back to Employee List button
                                document.getElementById("backToEmployees").addEventListener("click", function () {
                                    employeesButton.click(); // Reload full employee list
                                });
                            })
                            .catch(error => {
                                alert(error.message);
                            });
                    });
                } else {
                    console.error('Search button not found');
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    });


    
    // ✅ Open Edit Form
    function openEditForm(event) {
        const employeeId = event.target.getAttribute("data-id");
        const row = event.target.closest("tr");
        const employee = JSON.parse(row.getAttribute("data-employee"));
    
        // Create a form for updating employee details
        middleView.innerHTML = `
            <div>
                <h2>Edit Employee</h2>
                <form id="editEmployeeForm">
                    <label>First Name: <input type="text" name="firstName" value="${employee.firstName}" required></label><br>
                    <label>Last Name: <input type="text" name="lastName" value="${employee.lastName}" required></label><br>
                    <label>Phone: <input type="text" name="phoneNumber" value="${employee.phoneNumber}" required></label><br>
                    <label>Date of Birth: <input type="date" name="dateOfBirth" value="${employee.dateOfBirth}" required></label><br>
                    <label>Gender: 
                        <select name="gender">
                            <option value="Male" ${employee.gender === "Male" ? "selected" : ""}>Male</option>
                            <option value="Female" ${employee.gender === "Female" ? "selected" : ""}>Female</option>
                        </select>
                    </label><br>
                    <label>Email: <input type="email" name="emailAddress" value="${employee.emailAddress}" required></label><br>
                    <label>Department: <input type="text" name="department" value="${employee.department || ""}"></label><br>
                    <label>Role: <input type="text" name="role" value="${employee.role || ""}"></label><br>
                    <label>Position: <input type="text" name="position" value="${employee.position || ""}"></label><br>
                    <label>Password: <input type="password" name="password" value="${employee.password || ""}" required></label><br>
                    <label>Date of Hiring: <input type="date" name="dateOfHiring" value="${employee.dateOfHiring || ""}"></label><br>
                    <label>Salary: <input type="number" name="salary" value="${employee.salary || ""}" step="0.01"></label><br>
                    <label>Image URL: <input type="text" name="image_path" value="${employee.image_path || ""}"></label><br>
                    
                    <button type="submit">Update Employee</button>
                    <button type="button" id="cancelEdit">Cancel</button>
                </form>
            </div>
        `;
    
        // Handle form submission
        document.getElementById("editEmployeeForm").addEventListener("submit", function (e) {
            e.preventDefault();
            
            // Create updated employee object from form data
            const updatedEmployee = {
                employeeId: employeeId,
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                phoneNumber: this.phoneNumber.value,
                dateOfBirth: this.dateOfBirth.value,
                gender: this.gender.value,
                emailAddress: this.emailAddress.value,
                department: this.department.value,
                role: this.role.value,
                position: this.position.value,
                password: this.password.value,
                dateOfHiring: this.dateOfHiring.value,
                salary: parseFloat(this.salary.value) || 0, // Convert to number
                image_path: this.image_path.value
            };
    
            updateEmployee(employeeId, updatedEmployee);
        });
    
        // Handle cancel button
        document.getElementById("cancelEdit").addEventListener("click", function () {
            employeesButton.click(); // Reload employee list
        });
    }
   
    function updateEmployee(employeeId, employee) {
        fetch(`http://localhost:8080/employees/${employeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee),
        })
        .then(response => response.json())
        .then(updatedEmployee => {
            alert("Employee updated successfully!");
            employeesButton.click(); // Refresh the table
        })
        .catch(error => console.error("Error updating employee:", error));
    }
    
    
    // ✅ Update Employee Function
    function updateEmployee(employeeId, employee) {
        fetch(`http://localhost:8080/employees/${employeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee),
        })
        .then(response => response.json())
        .then(updatedEmployee => {
            alert("Employee updated successfully!");
            employeesButton.click(); // Refresh the table
        })
        .catch(error => console.error("Error updating employee:", error));
    }
    
    // ✅ Delete Employee Function
    function deleteEmployee(event) {
        const employeeId = event.target.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this employee?")) {
            fetch(`http://localhost:8080/employees/${employeeId}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        alert("Employee deleted successfully!");
                        employeesButton.click(); // Refresh the table
                    } else {
                        alert("Error deleting employee.");
                    }
                })
                .catch(error => console.error("Error deleting employee:", error));
        }
    }

   

    

    // Handle Managers Button Click
    managersButton.addEventListener("click", () => {
        // Fetch manager data from the backend
        fetch("http://localhost:8080/getManagers")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Clear existing content
                middleView.innerHTML = `
                <div>
                    <h1>Employee List</h1>
                    <div>
                        <input type="number" id="searchManagerId" placeholder="Search manager by ID">
                        <button id="searchManagerBtn">Search</button>
                        <input type="number" id="employeeIdInput" placeholder="enter the employee id">
                        <button id="addManagerBtn">Add New Manager</button>
                    </div>
                </div>
                `;

                // Create a table for displaying managers
                const table = document.createElement("table");
                table.style.width = "100%";
                table.style.borderCollapse = "collapse";
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Position</th>
                            <th>Password</th>
                            <th>Date of Hiring</th>
                            <th>Salary</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(manager => `
                            <tr>
                                <td>${manager.managerId}</td>
                                <td>${manager.firstName}</td>
                                <td>${manager.lastName}</td>
                                <td>${manager.phoneNumber}</td>
                                <td>${manager.dateOfBirth}</td>
                                <td>${manager.gender}</td>
                                <td>${manager.emailAddress}</td>
                                <td>${manager.department || "N/A"}</td>
                                <td>${manager.role || "N/A"}</td>
                                <td>${manager.position || "N/A"}</td>
                                <td>${manager.password || "N/A"}</td>
                                <td>${manager.dateOfHiring || "N/A"}</td>
                                <td>${manager.salary || "N/A"}</td>
                                <td>
                                    ${manager.image_path ? `<img src="http://localhost:8080/${manager.image_path}" alt="Manager Image" style="width: 50px; height: 50px;">` : "N/A"}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;


                // Add table styles
                table.querySelectorAll("th, td").forEach(cell => {
                    cell.style.border = "1px solid #ddd";
                    cell.style.padding = "8px";
                    cell.style.textAlign = "left";
                });

                // Append the table to the middle view
                middleView.appendChild(table);

                const addManagerBtn = document.getElementById("addManagerBtn");
                addManagerBtn.addEventListener("click" ,() => {

                    let employeeId = document.getElementById("employeeIdInput").value;

                    console.log(employeeId);

                if (!employeeId) {
                    alert("Please enter a valid Employee ID");
                    return;
                }

                fetch(`http://localhost:8080/employees/${employeeId}`)
                .then(response => { 
                })
                    .then(employee => {
                        if (!employee) {
                            alert("Employee not found!");
                            return;
                        }

                        

                        // Create the form dynamical
                        middleView.innerHTML = `
                           <h3>Edit Employee & Promote to Manager</h3>
<form id="managerForm">
    <input type="hidden" id="empId" value="${employee.employeeId}">
    
    <label for="empFirstName">First Name:</label>
    <input type="text" id="empFirstName" value="${employee.firstName}"><br>

    <label for="empLastName">Last Name:</label>
    <input type="text" id="empLastName" value="${employee.lastName}"><br>

    <label for="empPhoneNumber">Phone Number:</label>
    <input type="text" id="empPhoneNumber" value="${employee.phoneNumber}"><br>

    <label for="empDateOfBirth">Date of Birth:</label>
    <input type="text" id="empDateOfBirth" value="${employee.dateOfBirth}"><br>

    <label for="empGender">Gender:</label>
    <input type="text" id="empGender" value="${employee.gender}"><br>

    <label for="empEmail">Email:</label>
    <input type="email" id="empEmail" value="${employee.emailAddress}"><br>

    <label for="empDepartment">Department:</label>
    <input type="text" id="empDepartment" value="${employee.department || ''}"><br>

    <label for="empRole">Role:</label>
    <input type="text" id="empRole" value="${employee.role || ''}"><br>

    <label for="empPosition">Position:</label>
    <input type="text" id="empPosition" value="Manager"><br>

    <label for="empPassword">Password:</label>
    <input type="text" id="empPassword" value="${employee.password || ''}"><br>

    <label for="empDateOfHiring">Date of Hiring:</label>
    <input type="text" id="empDateOfHiring" value="${employee.dateOfHiring || ''}"><br>

    <label for="empSalary">Salary:</label>
    <input type="text" id="empSalary" value="${employee.salary || ''}"><br>

    <label for="empImage">Employee Image:</label>
    <input type="text" id="empImage" value="${employee.image_path ? 'http://localhost:8080/' + employee.image_path : ''}" readonly><br>

    <button type="button" id="updatetoManager" >Transfer to Manager</button>
</form>

                        `;

                        document.getElementById("updatetoManager").addEventListener("click", () => {
                            updateToManager(employee.id);
                        });
      
                        
                    })

                })

                function updateToManager() {
                    let updatedEmployee = {
                        employeeId: document.getElementById("empId").value,
                        firstName: document.getElementById("empFirstName").value,
                        lastName: document.getElementById("empLastName").value,
                        phoneNumber: document.getElementById("empPhoneNumber").value,
                        dateOfBirth: document.getElementById("empDateOfBirth").value,
                        gender: document.getElementById("empGender").value,
                        emailAddress: document.getElementById("empEmail").value,
                        department: document.getElementById("empDepartment").value,
                        role: "MANAGER", // Manually setting the role to Manager
                        position: document.getElementById("empPosition").value,
                        password: document.getElementById("empPassword").value,
                        dateOfHiring: document.getElementById("empDateOfHiring").value,
                        salary: document.getElementById("empSalary").value,
                        image_path: document.getElementById("empImage").value, // Assuming you want to keep the image URL
                    };
                    

                    fetch("http://localhost:8080/updateToManager", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedEmployee)
                    })
                    .then(response => {
                        if (!response.ok) {
                            // If response is not okay, handle the error
                            throw new Error("Error: " + response.statusText);
                        }
                        return response.text(); // Use .text() for plain text response
                    })
                    .then(data => {
                        alert(data); // This will be the plain text message from the server
                        // Reload the page or refresh the manager list
                        managersButton.click();
                    })
                    .catch(error => console.error("Error updating employee:", error));
                }                

            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    });

// Handle Departments Button Click
departmentsButton.addEventListener("click", () => {
    // Fetch department data from the backend
    fetch("http://localhost:8080/getDepartments")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Clear existing content
            middleView.innerHTML = "<h1>Department List</h1>";

            // Create a table for displaying departments
            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>Manager Name</th>
                        <th>Phone</th>
                        <th>Number of Employees</th>
                        <th>Budget</th>
                        <th>Created Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(department => `
                        <tr>
                            <td>${department.departmentId}</td>
                            <td>${department.departmentName}</td>
                            <td>${department.managerName}</td>
                            <td>${department.phoneNumber || "N/A"}</td>
                            <td>${department.numberOfEmployees || "N/A"}</td>
                            <td>${department.budget || "N/A"}</td>
                            <td>${department.createdDate || "N/A"}</td>
                            <td>${department.description || "N/A"}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

            // Add table styles
            table.querySelectorAll("th, td").forEach(cell => {
                cell.style.border = "1px solid #ddd";
                cell.style.padding = "8px";
                cell.style.textAlign = "left";
            });

            // Append the table to the middle view
            middleView.appendChild(table);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
});

// Handle Salaries Button Click
SalaryButton.addEventListener("click", () => {
    // Fetch salary data from the backend
    fetch("http://localhost:8080/getSalaries")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Clear existing content
            middleView.innerHTML = "<h1>Salary List</h1>";

            // Create a table for displaying salaries
            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>salary_id</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>Basic Salary</th>
                        <th>bonus</th>
                        <th>Deductions</th>
                        <th>pay_date</th>
                        <th>netSalary</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(salary => `
                        <tr>
                            <td>${salary.salaryId}</td>
                            <td>${salary.firstname || "N/A"}</td>
                            <td>${salary.lastname || "N/A"}</td>
                            <td>${salary.basicSalary || "N/A"}</td>
                            <td>${salary.bonus || "N/A"}</td>
                            <td>${salary.deductions || "N/A"}</td>
                            <td>${salary.payDate || "N/A"}</td>
                            <td>${salary.netSalary || "N/A"}</td>
                            <td>${salary.status || "N/A"}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

            // Add table styles
            table.querySelectorAll("th, td").forEach(cell => {
                cell.style.border = "1px solid #ddd";
                cell.style.padding = "8px";
                cell.style.textAlign = "left";
            });

            // Append the table to the middle view
            middleView.appendChild(table);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
});


});

 // Handle Change Password Form Submission
 const changePasswordForm = document.getElementById('changePasswordForm');
 const passwordMessage = document.getElementById('passwordMessage');

 changePasswordForm.addEventListener('submit', (e) => {
     e.preventDefault();

     const currentPassword = document.getElementById('currentPassword').value;
     const newPassword = document.getElementById('newPassword').value;
     const confirmPassword = document.getElementById('confirmPassword').value;

     if (newPassword !== confirmPassword) {
         passwordMessage.textContent = 'New passwords do not match!';
         passwordMessage.style.color = 'red';
         return;
     }

     // Make an API request to change the password
     fetch('http://localhost:8080/changeAdminPassword', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         credentials: 'include', 
         body: JSON.stringify({
             currentPassword,
             newPassword
         })
     })
     .then(response => {
         if (!response.ok) {
             throw new Error('Failed to change password');
         }
         return response.json();
     })
     .then(data => {
         passwordMessage.textContent = data.message || 'Password changed successfully!';
         passwordMessage.style.color = 'green';
         changePasswordForm.reset();
     })
     .catch(error => {
         passwordMessage.textContent = error.message || 'An error occurred.';
         passwordMessage.style.color = 'red';
     });
 });
 document.addEventListener("DOMContentLoaded", function () {
    console.log("Fetching dashboard totals...");

    fetch('http://localhost:8080/totals') 
        .then(response => {
            console.log("API Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data fetched successfully:", data);

            // Employee, Manager, and Department Counts
            document.querySelector(".totalEmployees").textContent = `Total Employees: ${data.totalEmployees}`;
            document.querySelector(".totalDepartments").textContent = `Total Departments: ${data.totalDepartments}`;
            document.querySelector(".totalManagers").textContent = `Total Managers: ${data.totalManagers}`;

            // Leave Status
            document.getElementById("leaveApplied").textContent = `Leave Applied: ${data.appliedLeaves}`;
            document.getElementById("leaveApproved").textContent = `Leave Approved: ${data.approvedLeaves}`;
            document.getElementById("leavePending").textContent = `Leave Pending: ${data.pendingLeaves}`;
            document.getElementById("leaveRejected").textContent = `Leave Rejected: ${data.rejectedLeaves}`;
        })
        .catch(error => {
            console.error("Error fetching dashboard totals:", error);
            document.querySelector(".overview").innerHTML = `
                <p style="color: red;">Error loading dashboard data. Please try again later.</p>`;
        });
});



document.addEventListener('DOMContentLoaded', () => {
    // Select the logout button by its ID
    const logoutButton = document.getElementById('logoutBtn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Send a logout request to the backend (if applicable)
            fetch('http://localhost:8080/logout', { 
                method: 'POST',
                credentials: 'include' 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Logout failed with status: ${response.status}`);
                }
                // Redirect to homepage.html only if the logout request is successful
                window.location.href = '/homepage/home.html'; 
            })
            .catch(error => {
                console.error('Error during logout:', error);
                // Optionally, you can force redirect even if logout fails
                window.location.href = '/homepage/home.html';
            });
        });
    } else {
        console.error('Logout button not found');
    }
});

 



