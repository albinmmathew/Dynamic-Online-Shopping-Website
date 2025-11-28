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




// LOGIN
if (document.getElementById("loginForm")) {

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
        let validUser = users.find(u => u.email === email && u.password === password);

        if (!validUser) {
			document.getElementById("loginError").innerHTML =
				"Invalid email or password. <a href='register.html'>Create an account?</a>";
			return;
		}
				

        // Save login session
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        alert("Login successful!");

        // Redirect to home page
        window.location.href = "index.html";
    });
}
