// Check Login Status
function checkLogin() {
    let loggedUserEmail = localStorage.getItem("loggedInUser");
    if (!loggedUserEmail) {
        window.location.href = "login.html";
    }
    return loggedUserEmail;
}

// Get Products
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// Save Products
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// -------------------- SHOP PAGE --------------------
if (window.location.pathname.includes("shop.html")) {
    const userEmail = checkLogin();
    const productList = document.getElementById("productList");
    const adminAddProduct = document.getElementById("adminAddProduct");

    // Show Admin Button
    if (userEmail === "admin@gmail.com") {
        if (adminAddProduct) adminAddProduct.style.display = "block";
    }

    // Render Products
    function renderProducts() {
        const products = getProducts();
        productList.innerHTML = "";

        if (products.length === 0) {
            productList.innerHTML = `<h4 class='text-center text-muted col-12'>No products available</h4>`;
            return;
        }

        products.forEach(product => {
            let card = document.createElement("div");
            card.className = "col-md-4 mb-4";

            card.innerHTML = `
                <div class="card shadow-sm h-100">
                    <img src="${product.image}" class="card-img-top" style="height:220px; object-fit:cover;" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${product.description}</p>
                        <h5 class="fw-bold mb-3">₹${product.price}</h5>

                        <div class="d-flex justify-content-between mt-auto">
                            <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
                            
                            ${userEmail === "admin@gmail.com" ? `
                                <div>
                                    <a href="edit-product.html?id=${product.id}" class="btn btn-warning btn-sm">Edit</a>
                                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
                                </div>
                            ` : ""}
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    renderProducts();
}

// -------------------- ADD PRODUCT PAGE --------------------
if (window.location.pathname.includes("add-product.html")) {
    const userEmail = checkLogin();
    if (userEmail !== "admin@gmail.com") {
        alert("Access Denied");
        window.location.href = "shop.html";
    }

    document.getElementById("productForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let category = document.getElementById("category").value;
        let price = document.getElementById("price").value.trim();
        let description = document.getElementById("description").value.trim();
        let image = document.getElementById("image").value.trim();

        let products = getProducts();

        let newProduct = {
            id: Date.now(),
            name,
            category,
            price,
            description,
            image
        };

        products.push(newProduct);
        saveProducts(products);

        alert("Product added successfully!");
        window.location.href = "shop.html";
    });
}

// -------------------- EDIT PRODUCT PAGE --------------------
if (window.location.pathname.includes("edit-product.html")) {
    const userEmail = checkLogin();
    if (userEmail !== "admin@gmail.com") {
        alert("Access Denied");
        window.location.href = "shop.html";
    }

    let urlParams = new URLSearchParams(window.location.search);
    let editId = Number(urlParams.get("id"));
    let products = getProducts();
    let product = products.find(p => p.id === editId);

    if (!product) {
        alert("Product not found!");
        window.location.href = "shop.html";
    } else {
        document.getElementById("name").value = product.name;
        document.getElementById("category").value = product.category || "";
        document.getElementById("price").value = product.price;
        document.getElementById("description").value = product.description;
        document.getElementById("image").value = product.image;
    }

    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault();

        product.name = document.getElementById("name").value.trim();
        product.category = document.getElementById("category").value;
        product.price = document.getElementById("price").value.trim();
        product.description = document.getElementById("description").value.trim();
        product.image = document.getElementById("image").value.trim();

        saveProducts(products);

        alert("Product updated successfully!");
        window.location.href = "shop.html";
    });
}

// -------------------- SHARED FUNCTIONS --------------------

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);

    alert("Product deleted!");
    location.reload();
}

// Logout Handler
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}
