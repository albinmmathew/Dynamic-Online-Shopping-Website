// Helper to show Snackbar
function showSnackbar(message, type = "success") {
    const snackbar = document.getElementById("snackbar");
    const snackbarMessage = document.getElementById("snackbarMessage");

    // Set color based on type
    if (type === "error") {
        snackbar.classList.remove("bg-primary");
        snackbar.classList.add("bg-danger");
    } else {
        snackbar.classList.remove("bg-danger");
        snackbar.classList.add("bg-primary");
    }

    snackbarMessage.textContent = message;

    // Show toast using Bootstrap API
    const toast = new bootstrap.Toast(snackbar);
    toast.show();
}

// Get existing users or set empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

// Seed/Update Admin User
const adminUser = {
    id: 0,
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123"
};

// Remove existing admin if present (to ensure password update)
users = users.filter(u => u.email !== adminUser.email);
// Add admin back
users.push(adminUser);
localStorage.setItem("users", JSON.stringify(users));

console.log("Admin user seeded/updated:", adminUser);

// Registration
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showSnackbar("Please enter a valid email address.", "error");
            return;
        }

        // Password Validation
        if (password.length < 6) {
            showSnackbar("Password must be at least 6 characters long.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showSnackbar("Passwords do not match!", "error");
            return;
        }

        // Check duplicate email
        let exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            showSnackbar("Email already registered!", "error");
            return;
        }

        let newUser = {
            id: users.length + 1, // Simple ID generation as per requirement example
            name,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        showSnackbar("Registration successful! Redirecting...", "success");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

// LOGIN
if (document.getElementById("loginForm")) {

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value;

        // Basic Empty Check (HTML 'required' attribute handles this mostly, but good to have)
        if (!email || !password) {
            showSnackbar("Please fill in all fields.", "error");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
        let validUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!validUser) {
            showSnackbar("Invalid credentials", "error");
            return;
        }

        // Save login session (Use canonical email from record to ensure admin checks work)
        localStorage.setItem("loggedInUser", validUser.email);

        showSnackbar("Login successful! Redirecting...", "success");

        // Redirect to home page
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    });
}
