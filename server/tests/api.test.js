const axios = require('axios');
const { logger } = require('../config/logger');

const BASE_URL = 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

// Test data
const testRoom = {
  roomNumber: `T${Date.now()}`,
  type: 'Single',
  description: 'A cozy single room with modern amenities',
  capacity: 2,
  amenities: ['WiFi', 'TV', 'AC', 'Mini Fridge', 'Private Bathroom'],
  images: [
    { url: 'https://example.com/room101-1.jpg', caption: 'Room View' },
    { url: 'https://example.com/room101-2.jpg', caption: 'Bathroom' }
  ],
  pricePerNight: 1000,
  floor: 1
};

const testBooking = {
  checkIn: new Date(Date.now() + 86400000), // tomorrow
  checkOut: new Date(Date.now() + 259200000), // 3 days from now
  guests: {
    adults: 1,
    children: 1
  },
  specialRequests: 'Early check-in, extra pillows'
};

const testUser = {
  email: 'test@example.com',
  name: 'Test User',
  role: 'user'
};

// Helper function to test endpoints with better error handling
async function testEndpoint(method, endpoint, data = null) {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      validateStatus: null
    });
    
    logger.info(`${method.toUpperCase()} ${endpoint} - Status: ${response.status}`);
    if (response.status >= 400) {
      logger.error('Error response:', response.data);
    }
    return response;
  } catch (error) {
    logger.error(`Error testing ${method.toUpperCase()} ${endpoint}:`, error.message);
    if (error.response) {
      logger.error('Error response:', error.response.data);
    }
    return null;
  }
}

// Main test function with more comprehensive tests
async function runTests() {
  logger.info('🚀 Starting API tests...');

  // Test health endpoint
  const health = await axios({
    method: 'get',
    url: `${BASE_URL}/api/health`,
    validateStatus: null
  });
  
  if (health?.status !== 200) {
    logger.error('❌ Health check failed');
    logger.error('Error response:', health?.data);
    return;
  }
  logger.info('✅ Health check passed');
  logger.info('Health response:', health.data);

  // Test user endpoints
  logger.info('\n📋 Testing User endpoints:');
  const createdUser = await testEndpoint('post', '/users', testUser);
  if (createdUser?.status === 201) {
    const userId = createdUser.data._id;
    await testEndpoint('get', `/users/${userId}`);
    await testEndpoint('get', '/users');
    await testEndpoint('patch', `/users/${userId}`, { phone: '9876543210' });
  }

  // Test room endpoints
  logger.info('\n🏨 Testing Room endpoints:');
  const createdRoom = await testEndpoint('post', '/rooms', testRoom);
  if (createdRoom?.status === 201) {
    const roomId = createdRoom.data._id;
    await testEndpoint('get', `/rooms/${roomId}`);
    await testEndpoint('get', '/rooms');
    await testEndpoint('patch', `/rooms/${roomId}`, { pricePerNight: 1200 });
    
    // Test room search
    await testEndpoint('get', '/rooms/search/availability?type=Single&capacity=2');
    await testEndpoint('get', `/rooms/search/availability?checkIn=${testBooking.checkIn.toISOString()}&checkOut=${testBooking.checkOut.toISOString()}`);
  }

  // Test booking endpoints
  logger.info('\n📅 Testing Booking endpoints:');
  if (createdRoom?.data?._id && createdUser?.data?._id) {
    const bookingData = {
      ...testBooking,
      room: createdRoom.data._id,
      user: createdUser.data._id
    };
    const createdBooking = await testEndpoint('post', '/bookings', bookingData);
    if (createdBooking?.status === 201) {
      const bookingId = createdBooking.data._id;
      await testEndpoint('get', `/bookings/${bookingId}`);
      await testEndpoint('get', '/bookings');
      await testEndpoint('get', `/bookings/user/${createdUser.data._id}`);
      
      // Test booking cancellation
      await testEndpoint('post', `/bookings/${bookingId}/cancel`, { 
        reason: 'Change of plans'
      });
    }
  }

  logger.info('\n✨ API tests completed');
}

// Run tests if this file is run directly
if (require.main === module) {
  runTests().catch(error => {
    logger.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { runTests, testEndpoint }; 