// Check Login Status
function checkLogin() {
    let loggedUserEmail = localStorage.getItem("loggedInUser");
    if (!loggedUserEmail) {
        window.location.href = "login.html";
    }
    return loggedUserEmail;
}

// Default Products Data
const defaultProducts = [
    {
        id: 1764316444585,
        name: "Yamaha PSR-SX900",
        price: "146000",
        category: "Pianos & Keys",
        description: "Take your performance to a whole new dimension with the PSR-SX. Replacing the hugely successful PSR-S series, the PSR-SX900 is the new generation in Digital Workstation sound, design and user experience. These instruments will inspire and intensify your musical performance and enjoyment.\n\n1337 Voices, including 252 Super Articulation Voices, 24 Organ Flutes! Voices. 56 Drum/SFX kits\n525 Styles, including 463 Pro Styles, 46 Session Styles, 10 DJ Styles and 6 Freeplay Styles",
        image: "https://in.yamaha.com/en/files/sx900_main_tcm142-1696528.png?impolicy=resize&imwid=735&imhei=735"
    },
    {
        id: 1764316695463,
        name: "Yamaha PSR-SX700",
        price: "850000",
        category: "Pianos & Keys",
        description: "Take your performance to a whole new dimension with the PSR-SX. Replacing the hugely successful PSR-S series, the PSR-SX700 is the new generation in Digital Workstation sound, design and user experience. These instruments will inspire and intensify your musical performance and enjoyment. 986 Voices, including 131 Super Articulation voices and 24 Organ flutes. 41 Drum/SFX kits\n400 Styles, including 353 Pro Styles, 34 Session Styles, 10 DJ styles and 3 Free Play",
        image: "https://in.yamaha.com/en/files/sx700_main_tcm142-1730976.png?impolicy=resize&imwid=735&imhei=735"
    },
    {
        id: 1764320639934,
        name: "Yamaha CG142S Classical Guitar",
        price: "27000",
        category: "Guitars",
        description: "Highlights\nYamaha CG Shape\nSolid Spruce Top\nNato Back & Sides\nNato Neck\nRosewood Fingerboard",
        image: "https://yamahamusicstore.in/products-images/enlarge-image/WU15820.jpg?v=1764320615"
    },
    {
        id: 1764320842849,
        name: "Ortega RCE125SN",
        price: "280000",
        category: "Guitars",
        description: "ORT-RCE125SN",
        image: "https://www.bajaao.com/cdn/shop/files/ORT-RCE125SN.jpg?v=1725864849&width=1000"
    }
];

// Get Products
function getProducts() {
    let products = JSON.parse(localStorage.getItem("products"));

    // Seed default products if storage is empty
    if (!products || products.length === 0) {
        products = defaultProducts;
        localStorage.setItem("products", JSON.stringify(products));
    } else {
        // Optional: Ensure default products exist (merge if missing)
        // This ensures the user sees them even if they have other products
        let hasDefaults = defaultProducts.every(def => products.some(p => p.id === def.id));
        if (!hasDefaults) {
            // Add missing defaults
            defaultProducts.forEach(def => {
                if (!products.some(p => p.id === def.id)) {
                    products.push(def);
                }
            });
            localStorage.setItem("products", JSON.stringify(products));
        }
    }

    return products;
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
