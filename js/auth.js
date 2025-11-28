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

    }, 1000);
};
