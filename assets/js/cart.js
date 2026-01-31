// ========================
// CART ELEMENTS
// ========================
const cartContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const discountText = document.getElementById('discountText');

let appliedDiscount = 0;

// ========================
// LOAD CART
// ========================
const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p style="text-align:center; font-size:1.2rem;">
                Your cart is empty 🛒
            </p>
        `;
        cartTotal.textContent = '';
        return;
    }

    let total = 0;

    cartContainer.innerHTML = cart.map((item, index) => {
        const price = Number(item.price.replace('₹', ''));
        const qty = item.qty || 1;
        total += price * qty;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>

                    <div class="qty-box">
                        <button onclick="changeQty(${index}, -1)">−</button>
                        <span>${qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>

                <button class="cart-remove"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `Total: ₹${total - appliedDiscount}`;
};

// ========================
// CHANGE QUANTITY
// ========================
const changeQty = (index, change) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
};

// ========================
// REMOVE ITEM
// ========================
const removeFromCart = (index) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
};

// ========================
// CLEAR CART
// ========================
const clearCart = () => {
    if (!confirm('Are you sure you want to clear the cart?')) return;

    localStorage.removeItem('cart');
    appliedDiscount = 0;
    if (discountText) discountText.textContent = '';
    updateCartCount();
    loadCart();
};

// ========================
// CHECKOUT
// ========================
const checkout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Order placed successfully 🎉');

    localStorage.removeItem('cart');
    appliedDiscount = 0;
    updateCartCount();
    loadCart();
};

// ========================
// COUPON SYSTEM
// ========================
const applyCoupon = () => {
    const input = document.getElementById('couponCode');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        discountText.textContent = 'Cart is empty';
        return;
    }

    let total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price.replace('₹', '')) * (item.qty || 1),
        0
    );

    if (code === 'WELCOME10') {
        appliedDiscount = Math.round(total * 0.1);
        discountText.textContent = `🎉 WELCOME10 applied (-₹${appliedDiscount})`;
    }
    else if (code === 'MOONSPICE50' && total >= 500) {
        appliedDiscount = 50;
        discountText.textContent = `🔥 MOONSPICE50 applied (-₹50)`;
    }
    else {
        appliedDiscount = 0;
        discountText.textContent = '❌ Invalid or not applicable coupon';
    }

    cartTotal.textContent = `Total: ₹${total - appliedDiscount}`;
};

// ========================
// INIT
// ========================
window.addEventListener('DOMContentLoaded', loadCart);
