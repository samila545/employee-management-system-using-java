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
    const LeavesButton = document.querySelector(".side-bar li:nth-child(3)");
    const SalaryButton = document.querySelector(".side-bar li:nth-child(4)"); 
    const ProfileButton = document.querySelector(".side-bar li:nth-child(2)"); 
    

    const Settings = document.querySelector(".side-bar li:nth-child(5)"); // "salary" sidebar button
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




    ProfileButton.addEventListener("click", () => {
        // Fetch profile data from the backend
        fetch("http://127.0.0.1:8080/getProfile", { credentials: "include" })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch profile data.");
                }
                return response.json();
            })
            .then(employee => {
                const middleView = document.querySelector(".middle_view");
                // Clear existing content
                middleView.innerHTML = "<h1>Profile Details</h1>";
    
                // Create a profile info container
                const profileContainer = document.createElement("div");
                profileContainer.classList.add("profile-info");
    
                // Populate profile information
                profileContainer.innerHTML = `
                    <img src="${employee.image_path || 'default-profile.png'}" alt="Profile Image" class="profile-image" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;">
                    <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
                    <p><strong>First Name:</strong> ${employee.firstName}</p>
                    <p><strong>Last Name:</strong> ${employee.lastName}</p>
                    <p><strong>Phone Number:</strong> ${employee.phoneNumber}</p>
                    <p><strong>Date of Birth:</strong> ${employee.dateOfBirth}</p>
                    <p><strong>Gender:</strong> ${employee.gender}</p>
                    <p><strong>Email Address:</strong> ${employee.emailAddress}</p>
                    <p><strong>Department:</strong> ${employee.department}</p>
                    <p><strong>Position:</strong> ${employee.position}</p>
                    <p><strong>Role:</strong> ${employee.role}</p>
                    <p><strong>Date of Hiring:</strong> ${employee.dateOfHiring}</p>
                    <p><strong>Salary:</strong> ${employee.salary}</p>
                    <p><strong>Password:</strong> ${employee.password}</p>
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
    
// Listen for click event on the "Leaves" button (assuming you have a button like SalaryButton)

SalaryButton.addEventListener("click", () => {
    // Fetch salary data from the backend
    fetch("http://localhost:8080/getSalaryofEmployee")
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
LeavesButton.addEventListener("click", () => {
    // Fetch leave records for the logged-in employee
    fetch("http://localhost:8080/getEmployeeLeaves")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const middleView = document.querySelector(".middle_view");
            // Clear existing content in the middle view (assuming middleView is where you display the table)
            middleView.innerHTML = "<h1>Leave Records</h1>";

            // Create a div to hold the Apply button and table
            const applyButtonDiv = document.createElement("div");
            applyButtonDiv.classList.add("apply-button-container");

            // Create the Apply button
            const applyButton = document.createElement("button");
            applyButton.textContent = "Apply for Leave";
            applyButton.classList.add("apply-button");

            // Event listener for Apply button
            applyButton.addEventListener("click", () => {
                // Create the Apply Leave Form dynamically when button is clicked
                const applyLeaveForm = document.createElement("div");
                applyLeaveForm.classList.add("apply-leave-form");

                const formTitle = document.createElement("h3");
                formTitle.textContent = "Apply for Leave";
                applyLeaveForm.appendChild(formTitle);

                const form = document.createElement("form");
                form.id = "leaveForm";

                // Leave Type Text Input
                const leaveTypeLabel = document.createElement("label");
                leaveTypeLabel.textContent = "Leave Type:";
                const leaveTypeInput = document.createElement("input");
                leaveTypeInput.type = "text";
                leaveTypeInput.id = "leaveType";
                leaveTypeInput.placeholder = "Enter leave type (e.g., Sick, Vacation, etc.)";
                leaveTypeInput.required = true;
                form.appendChild(leaveTypeLabel);
                form.appendChild(leaveTypeInput);

                // Start Date
                const startDateLabel = document.createElement("label");
                startDateLabel.textContent = "Start Date:";
                const startDateInput = document.createElement("input");
                startDateInput.type = "date";
                startDateInput.id = "startDate";
                startDateInput.required = true;
                form.appendChild(startDateLabel);
                form.appendChild(startDateInput);

                // End Date
                const endDateLabel = document.createElement("label");
                endDateLabel.textContent = "End Date:";
                const endDateInput = document.createElement("input");
                endDateInput.type = "date";
                endDateInput.id = "endDate";
                endDateInput.required = true;
                form.appendChild(endDateLabel);
                form.appendChild(endDateInput);

                // Submit Button
                const submitButton = document.createElement("button");
                submitButton.type = "submit";
                submitButton.textContent = "Apply";
                form.appendChild(submitButton);

                // Append form to the apply leave form container
                applyLeaveForm.appendChild(form);

                // Append the apply leave form to the middle view
                middleView.appendChild(applyLeaveForm);

                // Event listener for form submission
                form.addEventListener("submit", (event) => {
                    event.preventDefault(); // Prevent form submission

                    const leaveType = leaveTypeInput.value;
                    const startDate = startDateInput.value;
                    const endDate = endDateInput.value;

                    // Check if all fields are filled
                    if (leaveType && startDate && endDate) {
                        const leaveApplication = {
                            leaveType: leaveType,
                            startDate: startDate,
                            endDate: endDate,
                        };

                        // Send POST request to backend
                        fetch("http://localhost:8080/applyLeave", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(leaveApplication),
                        })
                            .then(response => {
                                // Check if the response is successful
                                if (!response.ok) {
                                    throw new Error("Failed to apply leave: " + response.statusText);
                                }
                                return response.text(); // Parse the response as plain text
                            })
                            .then(message => {
                                // Display the returned message from the backend
                                alert(message);
                            })
                            .catch(error => {
                                // Handle any errors
                                console.error("Error:", error);
                                alert("An error occurred while submitting the leave application.");
                            });
                    }
                });
            });

            // Append the Apply button to the container
            applyButtonDiv.appendChild(applyButton);

            // Append the Apply button container above the table
            middleView.appendChild(applyButtonDiv);

            // Create a table for displaying leave records
            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(leave => `
                        <tr>
                            <td>${leave.leaveType || "N/A"}</td>
                            <td>${leave.startDate || "N/A"}</td>
                            <td>${leave.endDate || "N/A"}</td>
                            <td>${leave.status || "N/A"}</td>
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
    fetch('http://localhost:8080/changeEmployeePassword', {
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

})
