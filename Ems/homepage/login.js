document.addEventListener('DOMContentLoaded', function () {
    // Show the login modal when the login button is clicked
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            document.getElementById('loginModal').style.display = 'block';
        });
    }

    // Hide the login modal when the close button is clicked
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            document.getElementById('loginModal').style.display = 'none';
        });
    }

    // Hide the login modal when clicking outside of the modal content
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        window.addEventListener('click', function (event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    // Handle the login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent form from reloading the page

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password: password }),
                });

                if (response.ok) {
                    const data = await response.json();

                    // Store user data in localStorage
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('firstName', data.firstName);
                    localStorage.setItem('lastName', data.lastName);
                    localStorage.setItem('image', data.image);

                    // Redirect based on the role
                    if (data.role === 'admin') {
                        window.location.href = '/admin/admin.html';
                    } else if (data.role === 'employee') {
                        window.location.href = '/employee/employee.html';
                    } else if (data.role === 'manager') {
                        window.location.href = '/manager/manager.html';
                    }
                } else {
                    alert('Login failed: Invalid email or password');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Dynamically set the name on role-specific pages
    const role = localStorage.getItem('role');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const image = localStorage.getItem('image'); 

    if (role === 'admin') {
        const adminNameElem = document.getElementById('adminName');
        if (adminNameElem) adminNameElem.textContent = `${firstName} ${lastName}`;   
    } else if (role === 'employee') {
        const employeeNameElem = document.getElementById('employeeName');
        const employeeProfileImageElem = document.getElementById('empImage'); // Adjust selector as needed
        if (employeeNameElem) employeeNameElem.textContent = `${firstName} ${lastName}`;
        if (employeeProfileImageElem) employeeProfileImageElem.src = "http://localhost:8080/" + image; // Set the profile image source
    } else if (role === 'manager') {
        const managerNameElem = document.getElementById('managerName');
        const managerProfileImageElem = document.getElementById('manImage');// Adjust selector as needed
        if (managerNameElem) managerNameElem.textContent = `${firstName} ${lastName}`;
        if (managerProfileImageElem) managerProfileImageElem.src = "http://localhost:8080/" + image; // Set the profile image source
    }
    
});
