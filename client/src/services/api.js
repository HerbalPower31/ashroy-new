import { authenticatedRequest } from '../auth/AuthService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// User API
export const userApi = {
  getCurrentUser: () => authenticatedRequest(`${API_URL}/users/me`),
  updateProfile: (data) => authenticatedRequest(`${API_URL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
};

// Room API
export const roomApi = {
  getAllRooms: () => fetch(`${API_URL}/rooms`).then(res => res.json()),
  getRoomById: (id) => fetch(`${API_URL}/rooms/${id}`).then(res => res.json()),
  searchRooms: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return fetch(`${API_URL}/rooms/search/availability?${queryString}`)
      .then(res => res.json());
  }
};

// Booking API
export const bookingApi = {
  createBooking: (data) => authenticatedRequest(`${API_URL}/bookings`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getUserBookings: () => authenticatedRequest(`${API_URL}/bookings/user/me`),
  getBookingById: (id) => authenticatedRequest(`${API_URL}/bookings/${id}`),
  cancelBooking: (id, reason) => authenticatedRequest(`${API_URL}/bookings/${id}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  }),
  updateBooking: (id, data) => authenticatedRequest(`${API_URL}/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}; 