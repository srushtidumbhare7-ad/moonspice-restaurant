# 🍽️ Moonspice Restaurant Website

Moonspice is a modern, responsive restaurant website built using **HTML, CSS, and JavaScript**.  
It provides a complete user experience including menu browsing, cart management, table booking, and theme switching.

---

## 🌟 Features

### 🏠 Home
- Hero section with transparent sticky navbar
- Featured dishes & chef’s specials
- Recent bookings preview
- Dark / Light mode toggle

### 📜 Menu
- Dynamic menu rendering using JavaScript
- Filters: Veg / Non-Veg / Popular / Chef’s Special / Favorites
- Add to Cart functionality
- Favorites saved using Local Storage
- Popular badge (auto based on add count)

### 🛒 Cart
- Add / Remove items
- Quantity increase & decrease
- Live total price calculation
- Coupon system:
  - `WELCOME10` → 10% off
  - `MOONSPICE50` → ₹50 off (min ₹500)
- Clear Cart & Checkout
- Cart data persists using Local Storage

### 📅 Table Booking
- Form validation
- Booking confirmation modal
- Booking history page
- Cancel bookings
- Stored using Local Storage

### 📞 Contact
- Contact form with validation
- Success / error messages

---

## 🧰 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **Local Storage API**
- Responsive Design (Mobile-friendly)

---

## 📂 Project Structure

Moonspice/
│
├── index.html
├── menu.html
├── cart.html
├── booking.html
├── booking-history.html
├── contact.html
│
├── assets/
│ ├── css/
│ │ └── style.css
│ ├── js/
│ │ ├── script.js
│ │ ├── menu.js
│ │ ├── cart.js
│ │ ├── booking.js
│ │ └── booking-history.js
│ └── images/
│ ├── paneer-pakora.jpg
│ ├── chicken-biryani.jpg
│ └── ...


---

## 🖼️ Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Menu Page
![Menu Page](screenshots/menu.png)

### Cart Page
![Cart Page](screenshots/cart.png)

### Booking Page
![Booking Page](screenshots/booking.png)
