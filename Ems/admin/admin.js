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

    // Handle Employees Button Click
    employeesButton.addEventListener("click", () => {
        // Fetch employee data from the backend
        fetch("http://localhost:8080/getEmployees")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Clear existing content
                middleView.innerHTML = "<h1>Employee List</h1>";

                // Create a table for displaying employees
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
                        ${data.map(employee => `
                            <tr>
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
                middleView.innerHTML = "<h1>Manager List</h1>";

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
                        <th>name</th>
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
                            <td>${salary.name || "N/A"}</td>
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
     fetch('http://localhost:8080/changePassword', {
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
    fetch('http://localhost:8080/api/dashboard/totals')
        .then((response) => {
            console.log("API Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Data fetched successfully:", data);
            const overviewElements = document.querySelectorAll(".overview div");
            overviewElements[0].textContent = `Total Employees: ${data.totalEmployees}`;
            overviewElements[1].textContent = `Total Departments: ${data.totalDepartments}`;
            overviewElements[2].textContent = `Total Managers: ${data.totalManagers}`;
        })
        .catch((error) => {
            console.error("Error fetching dashboard totals:", error);
            document.querySelector(".overview").innerHTML = `
                <p style="color: red;">Error loading dashboard data. Please try again later.</p>`;
        });
});



