// lib/fakeApi.js - Simulazione completa del backend
const properties = [
  { 
    id: 1, 
    name: "Villa Paradiso", 
    location: "Lago di Como",
    type: "Villa",
    rooms: 4,
    guests: 8,
    pricePerNight: 250,
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: "available"
  },
  { 
    id: 2, 
    name: "Appartamento Mare", 
    location: "Rimini",
    type: "Appartamento",
    rooms: 2,
    guests: 4,
    pricePerNight: 120,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: "occupied"
  },
  { 
    id: 3, 
    name: "Casa Montagna", 
    location: "Cortina d'Ampezzo",
    type: "Chalet",
    rooms: 3,
    guests: 6,
    pricePerNight: 180,
    image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: "maintenance"
  }
];

const bookings = {
  1: [
    { 
      id: 101, 
      guest: "Mario Rossi", 
      email: "mario.rossi@email.com",
      phone: "+39 333 1234567",
      checkIn: "2025-01-15", 
      checkOut: "2025-01-22",
      status: "confirmed",
      totalPrice: 1750,
      guests: 4
    },
    { 
      id: 102, 
      guest: "Anna Bianchi", 
      email: "anna.bianchi@email.com",
      phone: "+39 333 7654321",
      checkIn: "2025-02-05", 
      checkOut: "2025-02-12",
      status: "pending",
      totalPrice: 1750,
      guests: 2
    },
  ],
  2: [
    { 
      id: 201, 
      guest: "Luca Verdi", 
      email: "luca.verdi@email.com",
      phone: "+39 333 9876543",
      checkIn: "2025-01-20", 
      checkOut: "2025-01-25",
      status: "checked-in",
      totalPrice: 600,
      guests: 3
    },
  ],
  3: [
    { 
      id: 301, 
      guest: "Sofia Neri", 
      email: "sofia.neri@email.com",
      phone: "+39 333 5555555",
      checkIn: "2025-02-10", 
      checkOut: "2025-02-17",
      status: "confirmed",
      totalPrice: 1260,
      guests: 5
    },
  ]
};

const users = [
  {
    id: 1,
    name: "Giovanni Proprietario",
    email: "giovanni@propora.com",
    role: "owner",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

// Simulazione API calls con delay realistico
export function fetchProperties() {
  return new Promise((resolve) => 
    setTimeout(() => resolve(properties), 800)
  );
}

export function fetchProperty(id) {
  return new Promise((resolve, reject) => 
    setTimeout(() => {
      const property = properties.find(p => p.id === parseInt(id));
      if (property) {
        resolve(property);
      } else {
        reject(new Error('Proprietà non trovata'));
      }
    }, 600)
  );
}

export function fetchBookings(propertyId) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(bookings[propertyId] || []), 700)
  );
}

export function authenticateUser(email, password) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (email === "demo@propora.com" && password === "demo123") {
        resolve(users[0]);
      } else {
        reject(new Error('Credenziali non valide'));
      }
    }, 1000)
  );
}

export function updateBookingStatus(bookingId, status) {
  return new Promise((resolve) =>
    setTimeout(() => {
      // Simula aggiornamento stato prenotazione
      resolve({ success: true, bookingId, status });
    }, 500)
  );
}

export function generateReport(propertyId, month, year) {
  return new Promise((resolve) =>
    setTimeout(() => {
      const propertyBookings = bookings[propertyId] || [];
      const revenue = propertyBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
      
      resolve({
        propertyId,
        month,
        year,
        totalBookings: propertyBookings.length,
        totalRevenue: revenue,
        occupancyRate: Math.round(Math.random() * 40 + 60), // 60-100%
        averageStay: Math.round(Math.random() * 3 + 4), // 4-7 giorni
        topGuests: propertyBookings.slice(0, 3)
      });
    }, 1200)
  );
}