// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

// Public route - Check availability
router.get('/availability', bookingController.checkAvailability);

// Protected routes - Need authentication
router.post('/', verifyToken, bookingController.createBooking);
router.get('/user', verifyToken, bookingController.getUserBookings);
router.patch('/:bookingId/cancel', verifyToken, bookingController.cancelBooking);
router.patch('/:bookingId/payment', verifyToken, bookingController.updatePaymentStatus);

module.exports = router;



