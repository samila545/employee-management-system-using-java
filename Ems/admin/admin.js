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
});
