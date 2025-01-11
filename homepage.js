// Show the login modal when the login button is clicked
document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'block';
});

// Hide the login modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
});

// Hide the login modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
});

// Handle the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Implement authentication logic here
    // For demonstration purposes, we'll just log the credentials
    console.log('email:', username);
    console.log('Password:', password);

    // Close the modal after login (in a real application, redirect to dashboard or appropriate page)
    document.getElementById('loginModal').style.display = 'none';

    // Example alert, replace with actual login logic
    alert('Login successful!');
});

// Function for get started button
function getStarted() {
    // Implement get started functionality
    alert("Getting started...");
    // Redirect to a relevant page, such as a registration page or tutorial
    window.location.href = "registration.html"; // Example - replace with actual URL
}