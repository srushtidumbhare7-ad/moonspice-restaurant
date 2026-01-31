// ========================
// GLOBAL VARIABLES
// ========================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('themeToggle');
const scrollToTopBtn = document.getElementById('scrollToTop');
// ========================
// CART (GLOBAL)
// ========================
const getCart = () =>
    JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = (cart) =>
    localStorage.setItem('cart', JSON.stringify(cart));

const updateCartCount = () => {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalQty;

};

// ========================
// DARK MODE / THEME
// ========================
const initializeTheme = () => {
    const theme = localStorage.getItem('theme') || 'light';
    applyTheme(theme);
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
};

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ========================
// HAMBURGER MENU
// ========================
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================
// STICKY NAVBAR STYLE
// ========================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ========================
// SET ACTIVE NAV LINK
// ========================
const setActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
};

setActiveNavLink();

// ========================
// SCROLL TO TOP BUTTON
// ========================
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================
// COUNTDOWN TIMER
// ========================
const initializeCountdown = () => {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    const updateCountdown = () => {
        // Set countdown to end in 7 days
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);

        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance <= 0) {
            countdownElement.textContent = 'Offer Ended';
            clearInterval(countdownTimer);
        }
    };

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
};

window.addEventListener('DOMContentLoaded', initializeCountdown);

// ========================
// SCROLL ANIMATIONS
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideUp 0.6s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe featured cards and menu items
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.featured-card, .menu-item, .mission-card, .team-card').forEach(element => {
        observer.observe(element);
    });
});

// ========================
// INITIALIZATION
// ========================
window.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateCartCount();
    showRecentBookings(); //  home bookings
});

const loader = document.getElementById('loader');
if (loader) {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 600); // smooth delay
}

// ========================
// SHOW RECENT BOOKINGS (HOME)
// ========================
const showRecentBookings = () => {
    const container = document.getElementById('recentBookings');
    if (!container) return; // only runs on home page

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (bookings.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; font-size:1.1rem;">
                You have no bookings yet 🍽️
            </p>
        `;
        return;
    }

    // show last 3 bookings
    const recent = bookings.slice(-3).reverse();

    container.innerHTML = recent.map(b => `
        <div class="menu-item" style="margin-bottom:20px;">
            <div class="booking-card">

                <h3>Booking ID: ${b.bookingId}</h3>
                <p><strong>Date:</strong> ${b.date}</p>
                <p><strong>Time:</strong> ${b.time}</p>
                <p><strong>Guests:</strong> ${b.guests}</p>
            </div>
        </div>
    `).join('');
};

