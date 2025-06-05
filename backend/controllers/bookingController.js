// controllers/bookingController.js

const Booking = require('../models/bookingModel');
const Court = require('../models/courtModel');
const TimeSlot = require('../models/timeSlotModel');
const mongoose = require('mongoose');

// Helper function to calculate price
const calculatePrice = (numberOfPlayers) => {
  const basePrice = 400; // For up to 4 players
  const extraPersonPrice = 100;
  
  if (numberOfPlayers <= 4) {
    return basePrice;
  } else {
    const extraPlayers = numberOfPlayers - 4;
    return basePrice + (extraPlayers * extraPersonPrice);
  }
};

// Check availability for a specific date
const checkAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    
    // Format the date to start of day for comparison
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);

    // Get next day for query range
    const nextDay = new Date(bookingDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Get all courts
    const courts = await Court.find({ status: 'Available' });
    
    // Get all time slots
    const timeSlots = await TimeSlot.find().sort({ displayOrder: 1 });
    
    // Get all bookings for the specified date that are either pending or confirmed
    const bookings = await Booking.find({
      bookingDate: {
        $gte: bookingDate,
        $lt: nextDay
      },
      status: { $in: ['Pending', 'Confirmed'] }
    });
    
    // Prepare availability data
    const availability = [];
    
    for (const timeSlot of timeSlots) {
      // Find which courts are booked for this time slot
      const bookedCourtsIds = bookings
        .filter(booking => booking.timeSlot.toString() === timeSlot._id.toString())
        .map(booking => booking.court.toString());
      
      // Find available courts for this time slot
      const availableCourts = courts.filter(
        court => !bookedCourtsIds.includes(court._id.toString())
      );
      
      availability.push({
        timeSlot: {
          _id: timeSlot._id,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          session: timeSlot.session
        },
        availableCourts: availableCourts.map(court => ({
          _id: court._id,
          courtNumber: court.courtNumber,
          name: court.name,
          basePrice: court.basePrice
        }))
      });
    }
    
    // Group by session (Morning/Evening)
    const groupedAvailability = {
      date: bookingDate.toISOString().split('T')[0],
      morning: availability.filter(item => item.timeSlot.session === 'Morning'),
      evening: availability.filter(item => item.timeSlot.session === 'Evening')
    };
    
    res.status(200).json(groupedAvailability);
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Error checking availability' });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { courtId, timeSlotId, bookingDate, numberOfPlayers, playerNames } = req.body;
    const userId = req.user._id; // Assuming you have authentication middleware
    
    if (!courtId || !timeSlotId || !bookingDate || !numberOfPlayers) {
      return res.status(400).json({ 
        message: 'Court, time slot, date and number of players are required' 
      });
    }
    
    // Check if the court exists and is available
    const court = await Court.findOne({ 
      _id: courtId, 
      status: 'Available' 
    }).session(session);
    
    if (!court) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Court not found or not available' });
    }
    
    // Check if the time slot exists
    const timeSlot = await TimeSlot.findById(timeSlotId).session(session);
    
    if (!timeSlot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Time slot not found' });
    }
    
    // Format the date to start of day
    const formattedDate = new Date(bookingDate);
    formattedDate.setHours(0, 0, 0, 0);
    
    // Check if the court is already booked for this date and time slot
    const existingBooking = await Booking.findOne({
      court: courtId,
      timeSlot: timeSlotId,
      bookingDate: formattedDate,
      status: { $in: ['Pending', 'Confirmed'] }
    }).session(session);
    
    if (existingBooking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        message: 'This court is already booked for the selected time slot' 
      });
    }
    
    // Calculate total price
    const totalPrice = calculatePrice(numberOfPlayers);
    
    // Create the booking with status 'Pending'
    const newBooking = new Booking({
      user: userId,
      court: courtId,
      timeSlot: timeSlotId,
      bookingDate: formattedDate,
      numberOfPlayers,
      playerNames: playerNames || [],
      totalPrice,
      status: 'Pending'
    });
    
    await newBooking.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        _id: newBooking._id,
        court: court.name,
        date: formattedDate.toISOString().split('T')[0],
        time: `${timeSlot.startTime} - ${timeSlot.endTime}`,
        numberOfPlayers,
        totalPrice,
        status: 'Pending'
      }
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Get user's bookings
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authentication middleware
    
    const bookings = await Booking.find({ user: userId })
      .populate('court', 'name courtNumber')
      .populate('timeSlot', 'startTime endTime session')
      .sort({ bookingDate: -1, 'timeSlot.startTime': 1 });
    
    const formattedBookings = bookings.map(booking => ({
      _id: booking._id,
      court: booking.court.name,
      courtNumber: booking.court.courtNumber,
      date: booking.bookingDate.toISOString().split('T')[0],
      time: `${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}`,
      session: booking.timeSlot.session,
      numberOfPlayers: booking.numberOfPlayers,
      totalPrice: booking.totalPrice,
      status: booking.status,
      paymentId: booking.paymentId,
      createdAt: booking.createdAt
    }));
    
    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error('Error getting user bookings:', error);
    res.status(500).json({ message: 'Error getting bookings' });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id; // Assuming you have authentication middleware
    const { reason } = req.body;
    
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking is already cancelled
    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }
    
    // Update booking status to Cancelled
    booking.status = 'Cancelled';
    booking.cancellationReason = reason || 'User cancelled';
    
    await booking.save();
    
    res.status(200).json({ 
      message: 'Booking cancelled successfully',
      bookingId
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};

// Update booking payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentId } = req.body;
    const userId = req.user._id; // Assuming you have authentication middleware
    
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Update booking status to Confirmed and save payment ID
    booking.status = 'Confirmed';
    booking.paymentId = paymentId;
    
    await booking.save();
    
    res.status(200).json({ 
      message: 'Payment confirmed successfully',
      booking: {
        _id: booking._id,
        status: booking.status,
        paymentId: booking.paymentId
      }
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
  }
};

module.exports = {
  checkAvailability,
  createBooking,
  getUserBookings,
  cancelBooking,
  updatePaymentStatus
};
