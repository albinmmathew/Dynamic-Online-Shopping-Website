# Octave Store - Online Music Shop

A fully functional, dynamic online shopping website built with HTML, CSS (Bootstrap 5 + Material Design), and JavaScript. This project uses LocalStorage to simulate a backend database for user authentication, product management, and cart functionality.

## 📄 Page Explanations

*   **Home Page (`index.html`)**: The landing page featuring a responsive navbar, a hero section with a "Start Shopping" call-to-action, and a "Featured Categories" section displaying product categories (Electronics, Fashion, Home & Living).
*   **Shop Page (`shop.html`)**: Displays all available products in a responsive grid layout. Users can view product details and add items to their cart. Admin users see additional "Edit" and "Delete" buttons for each product.
*   **Cart Page (`cart.html`)**: Shows selected items, allows users to increase/decrease quantities or remove items, and calculates the total price dynamically.
*   **Login Page (`login.html`)**: Allows users to sign in. Validates credentials against stored users.
*   **Register Page (`register.html`)**: Allows new users to create an account. Includes validation for email format, password length, and password matching.
*   **Add Product Page (`add-product.html`)**: *Admin Only*. A form to create new products with name, price, description, and image URL.
*   **Edit Product Page (`edit-product.html`)**: *Admin Only*. A form pre-filled with existing product data to update details.

## 🛠️ CRUD Operations

The application performs Create, Read, Update, and Delete (CRUD) operations using browser **LocalStorage**:

*   **Create**:
    *   **Users**: New user objects are created and stored in the `users` array upon registration.
    *   **Products**: Admins can create new product objects which are pushed to the `products` array.
*   **Read**:
    *   **Products**: The Shop page reads and displays the `products` array.
    *   **Cart**: The Cart page reads the `cart` array and cross-references it with `products` to display details.
    *   **Auth**: Login checks against the `users` array to verify credentials.
*   **Update**:
    *   **Products**: Admins can modify existing product details. The specific object in the `products` array is found by ID and updated.
    *   **Cart**: Users can update the quantity of items in their cart.
*   **Delete**:
    *   **Products**: Admins can remove a product. The item is filtered out of the `products` array.
    *   **Cart**: Users can remove items from their cart.

## 🎨 UI Components Used

### Bootstrap 5 Elements
*   **Navbar**: Responsive navigation bar with toggle button for mobile views.
*   **Grid System**: Used extensively (rows and columns) for layout responsiveness.
*   **Cards**: Used for displaying products and categories.
*   **Forms**: Form controls and layout structure.
*   **Utilities**: Spacing (margin/padding), text alignment, and display utilities.

### Material Design (MDB) Components
*   **Material Inputs**: Floating labels and animated input fields (`form-outline`).
*   **Material Buttons**: Ripple effect buttons with shadow depth.
*   **Cards**: Enhanced cards with shadow effects (`shadow-sm`, `shadow-lg`).
*   **Snackbars/Toasts**: Used for success/error notifications during login and registration.

## 🔐 Login & Registration Workflow

1.  **Registration**:
    *   User enters Name, Email, Password, and Confirm Password.
    *   **Validation**:
        *   Email must be valid regex format.
        *   Password must be ≥ 6 characters.
        *   Passwords must match.
        *   Email must not already exist in `users` LocalStorage.
    *   **Success**: User is added to `users` array and redirected to Login.

2.  **Login**:
    *   User enters Email and Password.
    *   **Validation**: Checks if email/password combination exists in `users` array.
    *   **Success**:
        *   `loggedInUser` is saved to LocalStorage (email string).
        *   User is redirected to Home page.
    *   **Admin Access**: If the email is `admin@gmail.com`, the user is granted access to "Add Product", "Edit", and "Delete" features.

3.  **Logout**:
    *   `loggedInUser` is removed from LocalStorage.
    *   User is redirected to the Login page.

## 👤 Admin Credentials

*   **Email**: `admin@gmail.com`
*   **Password**: `admin123`
