// Show the login overlay and hide the home section when the login button is clicked
document.getElementById('loginBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default navigation
    document.getElementById('home').style.display = 'none'; // Hide the home section
    document.getElementById('loginOverlay').style.display = 'flex'; // Show the login overlay
});

// Show the home section and hide the login overlay when the home button is clicked
document.getElementById('homeBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default navigation
    document.getElementById('loginOverlay').style.display = 'none'; // Hide the login overlay
    document.getElementById('home').style.display = 'flex'; // Show the home section
});

// Hide the login overlay when the close button is clicked
document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('loginOverlay').style.display = 'none'; // Hide the login overlay
    document.getElementById('home').style.display = 'flex'; // Show the home section
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get selected user type and credentials
    const userType = document.getElementById('user-type').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform validation
    if (!username || !password) {
        alert('Please fill out all fields.');
        return;
    }

    // Redirect to appropriate dashboard based on user type
    switch (userType) {
        case 'admin':
            alert('Redirecting to Admin Dashboard...');
            window.location.href = 'admin-dashboard.html';
            break;
        case 'manager':
            alert('Redirecting to Manager Dashboard...');
            window.location.href = 'manager-dashboard.html';
            break;
        case 'employee':
            alert('Redirecting to Employee Dashboard...');
            window.location.href = 'employee-dashboard.html';
            break;
        default:
            alert('Invalid user type selected.');
    }
});