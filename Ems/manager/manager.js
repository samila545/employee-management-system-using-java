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
                middleView.innerHTML = "<h1>Manage Records</h1>";
        
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
            `
                                       <button class="approve-btn" data-leave-id="${leave.leaveId}">Approve</button>
                                       <button class="reject-btn" data-leave-id="${leave.leaveId}">Reject</button>
            ` :  "No Action"
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
                    if (e.target && e.target.matches('button.reject-btn')) {
                        const leaveId = e.target.getAttribute('data-leave-id');
                        rejectLeave(leaveId);  // Call rejectLeave function on button click
                    }
                });
        
                function rejectLeave(leaveId) {
                    console.log(`Rejecting leave with ID: ${leaveId}`);
                    // Perform the rejection logic (e.g., update the leave status in the database)
                    // Example: You might want to send an API request to reject the leave
                    fetch(`http://localhost:8080/rejectLeave/${leaveId}`, {
                        method: 'PATCH', // Assuming PATCH method for updating status
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: 'Rejected' })  // Example payload
                    })
                    .then(response => response.json())
                    .then(updatedLeave => {
                        console.log('Leave rejected:', updatedLeave);
                        // Optionally, refresh the table or update the status in the UI
                        // This could trigger a re-fetch of the leave data
                        LeavesButton.click();  // Reload the page to reflect the updated status
                    })
                    .catch(error => {
                        console.error('Error rejecting leave:', error);
                    });
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
            
                        LeavesButton.click();
                        
                    })
                    
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

document.addEventListener("DOMContentLoaded", function () {
    console.log("Fetching dashboard totals...");

    fetch('http://localhost:8080/total')  // Make sure this is the correct API endpoint
        .then(response => {
            console.log("API Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data fetched successfully:", data);

            // Update the HTML elements with the fetched data
            document.querySelector(".totalEmployees").textContent = `Total Employees: ${data.totalEmployees}`;
            document.querySelector(".totalDepartments").textContent = `Total Departments: ${data.totalDepartments}`;
        })
        .catch(error => {
            console.error("Error fetching dashboard totals:", error);
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
