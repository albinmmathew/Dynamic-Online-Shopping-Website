// Get existing users or set empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

// Registration
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        // Validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Check duplicate email
        let exists = users.some(u => u.email === email);
        if (exists) {
            alert("Email already registered!");
            return;
        }

        let newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}
