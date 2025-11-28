# Dynamic Online Shopping Website

A fully functional, dynamic online shopping website built with HTML, CSS (Bootstrap 5 + Material Design), and JavaScript. This project uses LocalStorage to simulate a backend database for user authentication, product management, and cart functionality.

## Features

### User Features
*   **User Authentication**: Secure Login and Registration pages with validation.
*   **Browse Products**: View available products in the Shop page with a responsive grid layout.
*   **Shopping Cart**: Add items to cart, update quantities, and remove items. Real-time total price calculation.
*   **Responsive Design**: Optimized for mobile, tablet, and desktop devices using Bootstrap 5.
*   **Interactive UI**: Enhanced with Material Design components, including cards, buttons, inputs, and snackbar notifications.

### Admin Features
*   **Admin Access**: Special access for admin users (Email: `admin@gmail.com`).
*   **Product Management (CRUD)**:
    *   **Create**: Add new products with image, description, and price.
    *   **Read**: View all products in the shop.
    *   **Update**: Edit existing product details.
    *   **Delete**: Remove products from the store.

## Technologies Used

*   **HTML5**: Semantic structure of the web pages.
*   **CSS3**: Styling and layout.
    *   **Bootstrap 5**: Responsive grid system and components.
    *   **MDB (Material Design for Bootstrap)**: Material Design UI elements.
*   **JavaScript (ES6+)**: Core logic for interactivity and data management.
    *   **LocalStorage**: Used as a client-side database to persist Users, Products, and Cart data.

## Installation & Usage

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Open the project**:
    Navigate to the project folder and open `index.html` in your web browser.

## How to Use

### 1. Registration & Login
*   Open the website and navigate to the **Login** page.
*   Click **Register** to create a new account.
*   Login with your credentials.

### 2. Admin Access
*   To access Admin features (Add/Edit/Delete products), login with the following credentials:
    *   **Email**: `admin@gmail.com`
    *   **Password**: `admin123` (or any valid password)

### 3. Shopping
*   Browse products on the **Shop** page.
*   Click **Add to Cart** to add items.
*   Go to the **Cart** page to manage your items and view the total cost.

## Project Structure

*   `index.html`: Landing page with featured categories.
*   `shop.html`: Product listing page.
*   `cart.html`: Shopping cart page.
*   `login.html` / `register.html`: Authentication pages.
*   `add-product.html` / `edit-product.html`: Admin pages for product management.
*   `js/`: Contains JavaScript files (`auth.js`, `products.js`, `cart.js`).
*   `css/`: Contains custom styles.

## License

This project is for educational purposes.
