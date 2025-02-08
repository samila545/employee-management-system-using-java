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
    const LeavesButton = document.querySelector(".side-bar li:nth-child(3)"); // "Managers" sidebar button
    const SalaryButton = document.querySelector(".side-bar li:nth-child(4)"); // "departments" sidebar button
    const ProfileButton = document.querySelector(".side-bar li:nth-child(5)"); // "salary" sidebar button

    const middleView = document.querySelector(".middle_view"); // Main content area
    fetchAnnouncements();
    fetchStatistics();

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
    
    function fetchStatistics() {
        fetch('http://localhost:8080/getTotals')
            .then(response => response.json())
            .then(data => {
                document.querySelector('#totalEmployees').textContent = `Total Employees: ${data.totalEmployees}`;
                document.querySelector('#employeesInDepartment').textContent = `Employees in Department: ${data.employeesInDepartment}`;
                document.querySelector('#totalDepartments').textContent = `Total Departments: ${data.totalDepartments}`;
            })
            .catch(error => console.error('Error fetching statistics:', error));
    }


    function approveLeave(leaveId) {
        // Call the API to update the status in the database
        fetch(`http://localhost:8080/${leaveId}/approve`, {
            method: 'PATCH',  // Using PATCH to update an existing resource
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(updatedLeave => {
            // If successful, update the status in the UI
            const statusCell = document.getElementById(`status-${leaveId}`);
            statusCell.textContent = updatedLeave.status;  // Update status in table
    
            // Disable the "Approve" button or change it as needed
            const buttonCell = document.querySelector(`#leave-row-${leaveId} td:last-child`);
            buttonCell.innerHTML = "Approved";  // Change the action text or disable button
        })
        
    }
 
    



    // Handle Employees Button Click
    employeesButton.addEventListener("click", () => {
        // Fetch employee data from the backend
        fetch("http://localhost:8080/getEmployeesByManager")
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

    ProfileButton.addEventListener("click", () => {
        // Fetch profile data from the backend
        fetch("http://127.0.0.1:8080/getProfileofManager", { credentials: "include" })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch profile data.");
                }
                return response.json();
            })
            .then(manager => {
                const middleView = document.querySelector(".middle_view");
                // Clear existing content
                middleView.innerHTML = "<h1>Profile Details</h1>";
    
                // Create a profile info container
                const profileContainer = document.createElement("div");
                profileContainer.classList.add("profile-info");
    
                // Populate profile information
                profileContainer.innerHTML = `
                    <img src="${manager.image_path || 'default-profile.png'}" alt="Profile Image" class="profile-image" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;">
                    <p><strong>manager ID:</strong> ${manager.managerId}</p>
                    <p><strong>First Name:</strong> ${manager.firstName}</p>
                    <p><strong>Last Name:</strong> ${manager.lastName}</p>
                    <p><strong>Phone Number:</strong> ${manager.phoneNumber}</p>
                    <p><strong>Date of Birth:</strong> ${manager.dateOfBirth}</p>
                    <p><strong>Gender:</strong> ${manager.gender}</p>
                    <p><strong>Email Address:</strong> ${manager.emailAddress}</p>
                    <p><strong>Department:</strong> ${manager.department}</p>
                    <p><strong>Position:</strong> ${manager.position}</p>
                    <p><strong>Role:</strong> ${manager.role}</p>
                    <p><strong>Date of Hiring:</strong> ${manager.dateOfJoining}</p>
                    <p><strong>Salary:</strong> ${manager.salary}</p>
                    <p><strong>Password:</strong> ${manager.password}</p>
                `;
    
                // Add some basic styles
                profileContainer.style.margin = "20px";
                profileContainer.style.fontFamily = "Arial, sans-serif";
                profileContainer.querySelectorAll("p").forEach(p => {
                    p.style.margin = "10px 0";
                    p.style.lineHeight = "1.5";
                });
    
                // Append the profile info to the middle view
                middleView.appendChild(profileContainer);
            })
            .catch(error => {
                const middleView = document.querySelector(".middle_view");
                middleView.innerHTML = `<p>Error fetching profile: ${error.message}</p>`;
            });
    });
    


    LeavesButton.addEventListener("click", () => {
        // Fetch leave records for the logged-in employee
        fetch("http://localhost:8080/getLeavesByManager")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const middleView = document.querySelector(".middle_view");
                // Clear existing content in the middle view (assuming middleView is where you display the table)
                middleView.innerHTML = "<h1>Manage Records</h1><input class='searches' type='number' placeholder='search by Id'><button class='search-btn'>Search</button>";
        
                // Create a table for displaying leave records
                const table = document.createElement("table");
                table.style.width = "100%";
                table.style.borderCollapse = "collapse";
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Leave Id</th>
                            <th>Employee Id</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="leave-table-body">
                        ${data.map(leave => `
                            <tr>
                                <td>${leave.leaveId || "N/A"}</td>
                                <td>${leave.employeeId || "N/A"}</td>
                                <td>${leave.leaveType || "N/A"}</td>
                                <td>${leave.startDate || "N/A"}</td>
                                <td>${leave.endDate || "N/A"}</td>
                                <td>${leave.status || "N/A"}</td>
                                <td>
                                    ${leave.status === "Pending" ? 
                                        `<button class="approve-btn" data-leave-id="${leave.leaveId}">Approve</button>` : 
                                        "No Action"
                                    }
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
    
                // Add event listener for the approve button
                table.addEventListener('click', (e) => {
                    if (e.target && e.target.matches('button.approve-btn')) {
                        const leaveId = e.target.getAttribute('data-leave-id');
                        approveLeave(leaveId);  // Call approveLeave function on button click
                    }
                });
    
                // Add event listener for the search functionality
                const searchButton = document.querySelector('.search-btn');
                const searchInput = document.querySelector('.searches');
    
                searchButton.addEventListener('click', () => {
                    const searchId = searchInput.value.trim();
                    if (searchId) {
                        const filteredData = data.filter(leave => leave.employeeId.toString().includes(searchId));
                        updateTable(filteredData); // Update the table with filtered data
                    } else {
                        updateTable(data); // Show all records if no search input
                    }
                });
    
                // Function to update the table with filtered data
                function updateTable(filteredData) {
                    const tableBody = document.querySelector('#leave-table-body');
                    // Ensure we clear the current table rows before adding new ones
                    tableBody.innerHTML = '';
                    // Populate the table with filtered rows
                    filteredData.forEach(leave => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${leave.leaveId || "N/A"}</td>
                            <td>${leave.employeeId || "N/A"}</td>
                            <td>${leave.leaveType || "N/A"}</td>
                            <td>${leave.startDate || "N/A"}</td>
                            <td>${leave.endDate || "N/A"}</td>
                            <td>${leave.status || "N/A"}</td>
                            <td>
                                ${leave.status === "Pending" ? 
                                    `<button class="approve-btn" data-leave-id="${leave.leaveId}">Approve</button>` : 
                                    "No Action"
                                }
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    });
    
     


    
 
 
SalaryButton.addEventListener("click", () => {
    // Fetch salary data from the backend
    fetch("http://localhost:8080/getSalaryofManager")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {

            const middleView = document.querySelector(".middle_view");
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
    fetch('http://localhost:8080/changeManagerPassword', {
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

});
