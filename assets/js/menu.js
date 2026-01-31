// ========================
// FAVORITES (LOCAL STORAGE)
// ========================
const getFavorites = () =>
    JSON.parse(localStorage.getItem('favorites')) || [];

const saveFavorites = (favorites) =>
    localStorage.setItem('favorites', JSON.stringify(favorites));


// ========================
// MENU DATA
// ========================
const menuData = { starters: [{ name: 'Paneer Pakora', price: '₹180', description: 'Crispy gram flour coated paneer fritters', type: 'veg', spice: 2, popular: true, special: false, image: 'assets/images/menu/paneer-pakora.jpg' }, { name: 'Veg Manchurian', price: '₹200', description: 'Fried vegetable balls tossed in Indo-Chinese sauce', type: 'veg', spice: 3, popular: true, special: false, image: 'assets/images/menu/veg-manchurian.jpg' }, { name: 'Chicken Lollipop', price: '₹260', description: 'Crispy fried chicken wings with spicy sauce', type: 'non-veg', spice: 3, popular: true, special: false, image: 'assets/images/menu/chicken-lollipop.jpg' }, { name: 'Spring Rolls', price: '₹170', description: 'Crispy vegetable spring rolls', type: 'veg', spice: 1, popular: false, special: false, image: 'assets/images/menu/spring-rolls.jpg' }], mains: [{ name: 'Paneer Butter Masala', price: '₹260', description: 'Paneer cubes in rich tomato butter gravy', type: 'veg', spice: 2, popular: true, special: true, image: 'assets/images/menu/paneer-butter-masala.jpg' }, { name: 'Dal Tadka', price: '₹220', description: 'Yellow dal tempered with garlic and spices', type: 'veg', spice: 1, popular: false, special: false, image: 'assets/images/menu/dal-tadka.jpg' }, { name: 'Veg Kolhapuri', price: '₹240', description: 'Spicy mixed vegetable curry Kolhapuri style', type: 'veg', spice: 3, popular: false, special: false, image: 'assets/images/menu/veg-kolhapuri.jpg' }, { name: 'Chicken Curry', price: '₹290', description: 'Traditional Indian chicken curry', type: 'non-veg', spice: 3, popular: true, special: false, image: 'assets/images/menu/chicken-curry.jpg' }, { name: 'Chicken Biryani', price: '₹320', description: 'Aromatic basmati rice cooked with spiced chicken', type: 'non-veg', spice: 2, popular: true, special: false, image: 'assets/images/menu/chicken-biryani.jpg' }], desserts: [{ name: 'Gulab Jamun (2 pcs)', price: '₹90', description: 'Soft milk dumplings soaked in sugar syrup', type: 'veg', spice: 0, popular: true, special: false, image: 'assets/images/menu/gulab-jamun.jpg' }, { name: 'Ice Cream', price: '₹110', description: 'Vanilla / Chocolate / Strawberry', type: 'veg', spice: 0, popular: false, special: false, image: 'assets/images/menu/ice-cream.jpg' }, { name: 'Brownie with Ice Cream', price: '₹160', description: 'Warm chocolate brownie served with ice cream', type: 'veg', spice: 0, popular: true, special: true, image: 'assets/images/menu/brownie-with-ice-cream.jpg' }], beverages: [{ name: 'Mineral Water', price: '₹30', description: '500ml bottled drinking water', type: 'veg', spice: 0, popular: false, special: false, image: 'assets/images/menu/mineral-water.jpg' }, { name: 'Masala Chaas', price: '₹60', description: 'Spiced buttermilk with herbs', type: 'veg', spice: 1, popular: false, special: false, image: 'assets/images/menu/masala-chaas.jpg' }, { name: 'Cold Coffee', price: '₹120', description: 'Chilled coffee with milk and ice', type: 'veg', spice: 0, popular: true, special: false, image: 'assets/images/menu/cold-coffee.jpg' }, { name: 'Fresh Lime Soda', price: '₹90', description: 'Refreshing lime soda (sweet / salted)', type: 'veg', spice: 0, popular: false, special: false, image: 'assets/images/menu/fresh-lime-soda.jpg' }] };

// ========================
// RENDER MENU ITEMS
// ========================
const renderMenuItems = (category, filter = 'all') => {
    const grid = document.getElementById(category + 'Grid');
    if (!grid) return;

    grid.innerHTML = '';
    const favorites = getFavorites();

    menuData[category].forEach((item, index) => {
        if (filter !== 'all') {
            if (filter === 'veg' && item.type !== 'veg') return;
            if (filter === 'non-veg' && item.type !== 'non-veg') return;
            if (filter === 'popular' && !item.popular) return;
            if (filter === 'special' && !item.special) return;
            if (filter === 'favorites' && !favorites.includes(item.name)) return;
        }

        const popularity = JSON.parse(localStorage.getItem('popularity')) || {};
    const isPopular = popularity[item.name] >= 3;
        const isFavorited = favorites.includes(item.name);

        let spiceHTML = '🌶️'.repeat(item.spice);

        const menuItem = document.createElement('div');
        menuItem.className = `menu-item ${isFavorited ? 'favorited' : ''}`;
        menuItem.style.animationDelay = `${index * 0.1}s`;

        menuItem.innerHTML = `
           <img src="${item.image}" 
     alt="${item.name}" 
     class="menu-image"
     onclick="addRecentlyViewed('${item.name}')">


            <span class="favorite-btn ${isFavorited ? 'active' : ''}"
                  onclick="toggleFavorite('${item.name}', this)">
                ❤️
            </span>

            <div class="menu-content">
                <div class="menu-header">
    <h3>${item.name}</h3>
    <span class="menu-price">${item.price}</span>
</div>

${isPopular ? `<span class="special-badge">🔥 Popular</span>` : ''}

<p class="menu-description">${item.description}</p>


                <div class="menu-footer">
                    <span>${item.type === 'veg' ? '🥬 Veg' : '🍗 Non-Veg'}</span>
                    <span>${spiceHTML}</span>
                    <button class="add-cart-btn"
                        onclick="addToCart('${item.name}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(menuItem);
    });
};


// ========================
// FAVORITE TOGGLE
// ========================
const toggleFavorite = (itemName, btn) => {
    let favorites = getFavorites();

    if (favorites.includes(itemName)) {
        favorites = favorites.filter(item => item !== itemName);
        btn.classList.remove('active');
        btn.closest('.menu-item').classList.remove('favorited');
    } else {
        favorites.push(itemName);
        btn.classList.add('active');
        btn.closest('.menu-item').classList.add('favorited');
    }

    saveFavorites(favorites);
};


// ========================
// ADD TO CART
// ========================
const addToCart = (itemName) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // find item details
    let foundItem = null;
    Object.values(menuData).forEach(category => {
        category.forEach(item => {
            if (item.name === itemName) foundItem = item;
        });
    });

    if (!foundItem) return;

    const existing = cart.find(i => i.name === itemName);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: foundItem.name,
            price: foundItem.price,
            image: foundItem.image,
            qty: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${itemName} added to cart`);
};


// ========================
// NOTIFICATION
// ========================
const showNotification = (message) => {
    const n = document.createElement('div');
    n.textContent = message;
    n.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 12px 18px;
        border-radius: 6px;
        z-index: 1000;
    `;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2500);
};


// ========================
// FILTER BUTTONS
// ========================
const initializeFilters = () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn')
                .forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            const filter = btn.dataset.filter;
            Object.keys(menuData).forEach(cat =>
                renderMenuItems(cat, filter)
            );
        });
    });
};


// ========================
// INIT
// ========================
window.addEventListener('DOMContentLoaded', () => {
    Object.keys(menuData).forEach(cat => renderMenuItems(cat));
    initializeFilters();
});
// ========================
// RECENTLY VIEWED ITEMS
// ========================
const addRecentlyViewed = (itemName) => {
    let recent = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    // remove duplicate
    recent = recent.filter(item => item !== itemName);

    // add to start
    recent.unshift(itemName);

    // keep only last 5
    if (recent.length > 5) recent.pop();

    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
};
// ========================
// SHOW RECENTLY VIEWED
// ========================
const showRecentlyViewed = () => {
    const grid = document.getElementById('recentGrid');
    if (!grid) return;

    const recent = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    if (recent.length === 0) return;

    grid.innerHTML = '';

    Object.values(menuData).flat().forEach(item => {
        if (recent.includes(item.name)) {
            grid.innerHTML += `
                <div class="menu-item">
                    <img src="${item.image}" class="menu-image">
                    <div class="menu-content">
                        <h3>${item.name}</h3>
                        <span class="menu-price">${item.price}</span>
                    </div>
                </div>
            `;
        }
    });
};

window.addEventListener('DOMContentLoaded', showRecentlyViewed);
