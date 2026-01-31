// ========================
// LOAD & DISPLAY BOOKINGS
// ========================
const loadBookings = () => {
    const container = document.getElementById('allBookings');
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (bookings.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; font-size:1.2rem;">
                No bookings found 🍽️
            </p>
        `;
        return;
    }

   container.innerHTML = bookings.reverse().map((b, index) => `
    <div class="booking-card">
        <h3>Booking ID: ${b.bookingId}</h3>
        <p><strong>Name:</strong> ${b.name}</p>
        <p><strong>Date:</strong> ${b.date}</p>
        <p><strong>Time:</strong> ${b.time}</p>
        <p><strong>Guests:</strong> ${b.guests}</p>

        <button class="btn btn-secondary"
            onclick="cancelBooking(${index})"
            style="margin-top:10px;">
            Cancel Booking
        </button>
    </div>
`).join('');

};

// ========================
// CANCEL BOOKING
// ========================
const cancelBooking = (index) => {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (!confirm('Are you sure you want to cancel this booking?')) return;

    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    loadBookings();
};

// ========================
// INIT
// ========================
window.addEventListener('DOMContentLoaded', loadBookings);
