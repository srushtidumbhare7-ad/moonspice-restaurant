// ========================
// BOOKING STORAGE
// ========================
const saveBookingToLocalStorage = (booking) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
};

// ========================
// FORM ELEMENTS
// ========================
const bookingForm = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('time');
const submitBtn = document.getElementById('submitBtn');
const availabilityStatus = document.getElementById('availabilityStatus');
const confirmationModal = document.getElementById('confirmationModal');
const closeBtn = document.querySelector('.close');

// ========================
// SET MIN DATE
// ========================
const setMinimumDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
};

// ========================
// AVAILABILITY (SIMULATED)
// ========================
const bookingData = {
    booked: {
        '2024-01-30': ['18:00', '18:30'],
        '2024-01-31': ['19:00'],
    }
};

const checkAvailability = () => {
    if (!dateInput.value || !timeSelect.value) {
        availabilityStatus.textContent = '';
        availabilityStatus.className = 'availability-status';
        return;
    }

    const bookedTimes = bookingData.booked[dateInput.value] || [];

    updateTimeOptions(dateInput.value);

    if (bookedTimes.length >= 6) {
        availabilityStatus.textContent = '✗ Fully Booked';
        availabilityStatus.className = 'availability-status fully-booked';
        submitBtn.disabled = true;
    } else if (bookedTimes.length >= 4) {
        availabilityStatus.textContent = '⚠ Almost Full';
        availabilityStatus.className = 'availability-status almost-full';
        submitBtn.disabled = false;
    } else {
        availabilityStatus.textContent = '✓ Available';
        availabilityStatus.className = 'availability-status available';
        submitBtn.disabled = false;
    }

    availabilityStatus.style.display = 'block';
};

const updateTimeOptions = (date) => {
    const bookedTimes = bookingData.booked[date] || [];
    [...timeSelect.options].forEach(opt => {
        if (opt.value && bookedTimes.includes(opt.value)) {
            opt.disabled = true;
            opt.textContent = `${opt.value} (Booked)`;
        } else {
            opt.disabled = false;
            opt.textContent = opt.value
                ? opt.value.replace(' (Booked)', '')
                : opt.textContent;
        }
    });
};

// ========================
// FORM VALIDATION
// ========================
const validateForm = () => {
    let valid = true;

    document.querySelectorAll('.form-group').forEach(g =>
        g.classList.remove('error')
    );

    const fields = ['name', 'email', 'phone', 'date', 'time', 'guests'];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value) {
            el.parentElement.classList.add('error');
            valid = false;
        }
    });

    return valid;
};

// ========================
// SHOW CONFIRMATION
// ========================
const showConfirmation = (data) => {
    const bookingId =
        'BOOK' + Math.random().toString(36).substring(2, 9).toUpperCase();

    document.getElementById('confirmName').textContent = data.name;
    document.getElementById('confirmEmail').textContent = data.email;
    document.getElementById('confirmPhone').textContent = data.phone;
    document.getElementById('confirmGuests').textContent = data.guests;
    document.getElementById('confirmDateTime').textContent =
        `${data.date} at ${data.time}`;
    document.getElementById('confirmNumber').textContent = bookingId;

    // 🔹 SAVE BOOKING
    saveBookingToLocalStorage({
        ...data,
        bookingId,
        createdAt: new Date().toISOString()
    });

    confirmationModal.classList.add('show');
};

// ========================
// EVENT LISTENERS
// ========================
dateInput?.addEventListener('change', checkAvailability);
timeSelect?.addEventListener('change', checkAvailability);

bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        date: date.value,
        time: time.value,
        guests: guests.value,
        requests: requests.value
    };

    showConfirmation(formData);
    bookingForm.reset();
    setMinimumDate();
});

closeBtn?.addEventListener('click', () =>
    confirmationModal.classList.remove('show')
);

window.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        confirmationModal.classList.remove('show');
    }
});

// ========================
// INIT
// ========================
window.addEventListener('DOMContentLoaded', setMinimumDate);
