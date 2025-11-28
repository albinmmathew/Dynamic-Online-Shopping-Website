// Check Login Status
function checkLogin() {
    let loggedUserEmail = localStorage.getItem("loggedInUser");
    if (!loggedUserEmail) {
        window.location.href = "login.html";
    }
    return loggedUserEmail;
}

// Initialize Page
checkLogin();

// Logout Handler
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}

// -------------------- CART LOGIC --------------------
const cartDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
    const cart = getCart();
    const products = getProducts();

    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = `<h4 class="text-muted text-center">Your cart is empty</h4>`;
        totalPriceEl.innerText = "0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        let product = products.find(p => p.id === item.id);

        // If product was deleted but still in cart, skip or handle it
        if (!product) return;

        let itemTotal = product.price * item.quantity;
        total += itemTotal;

        cartDiv.innerHTML += `
            <div class="card shadow-sm mb-3 p-3">
                <div class="row align-items-center">

                    <div class="col-md-2">
                        <img src="${product.image}" class="img-fluid rounded" style="max-height: 80px; object-fit: cover;" />
                    </div>

                    <div class="col-md-4">
                        <h5 class="mb-1">${product.name}</h5>
                        <p class="text-muted small mb-0">${product.description.substring(0, 50)}...</p>
                    </div>

                    <div class="col-md-3 text-center">
                        <h6 class="mb-2">₹${product.price} x ${item.quantity}</h6>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${product.id}, 'dec')">-</button>
                            <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${product.id}, 'inc')">+</button>
                        </div>
                    </div>

                    <div class="col-md-3 text-end">
                        <h6 class="fw-bold mb-2">₹${itemTotal}</h6>
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${product.id})">Remove</button>
                    </div>

                </div>
            </div>
        `;
    });

    totalPriceEl.innerText = total;
}

// Update Quantity
function updateQuantity(id, action) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);

    if (item) {
        if (action === "inc") item.quantity++;
        else if (action === "dec") item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }

        saveCart(cart);
        updateCartUI();
    }
}

// Remove Item
function removeItem(id) {
    if (!confirm("Remove this item from cart?")) return;

    let cart = getCart();
    cart = cart.filter(p => p.id !== id);
    saveCart(cart);
    updateCartUI();
}

// Initial Render
updateCartUI();
