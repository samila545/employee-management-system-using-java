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
            // Clear existing content in the middle view
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
                                    `
                                        <button class="approve-btn" data-leave-id="${leave.leaveId}">Approve</button>
                                        <button class="reject-btn" data-leave-id="${leave.leaveId}">Reject</button>
                                    ` : 
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

            // Add event listener for the approve and reject buttons
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

            // Add event listener for the search functionality
            const searchButton = document.querySelector('.search-btn');
            const searchInput = document.querySelector('.searches');
    
            searchButton.addEventListener('click', () => {
                const searchId = searchInput.value.trim();
                if (searchId) {
                    const filteredData = data.filter(leave => {
                        const employeeId = leave.employeeId ? leave.employeeId.toString().trim() : "";
                        return employeeId.includes(searchId.toString().trim());
                    });
                    updateTable(filteredData); // Update the table with filtered data
                } else {
                    updateTable(data); // Show all records if no search input
                }
            });
    
            // Function to update the table with filtered data
            function updateTable(filteredData) {
                const tableBody = document.querySelector('#leave-table-body');
                tableBody.innerHTML = '';
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
                                `
                                    <button class="approve-btn" data-leave-id="${leave.leaveId}">Approve</button>
                                    <button class="reject-btn" data-leave-id="${leave.leaveId}">Reject</button>
                                ` : 
                                "No Action"
                            }
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }

            // Reject leave function
         
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
});
