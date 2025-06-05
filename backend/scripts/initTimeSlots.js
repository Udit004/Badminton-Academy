// scripts/initTimeSlots.js

const mongoose = require('mongoose');
const TimeSlot = require('../models/timeSlotModel');
const dotenv = require('dotenv');

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for time slot initialization'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define all your time slots
const timeSlots = [
  // Morning slots
  { startTime: '06:00', endTime: '07:00', session: 'Morning', displayOrder: 1 },
  { startTime: '07:00', endTime: '08:00', session: 'Morning', displayOrder: 2 },
  { startTime: '08:00', endTime: '09:00', session: 'Morning', displayOrder: 3 },
  { startTime: '09:00', endTime: '10:00', session: 'Morning', displayOrder: 4 },
  
  // Evening slots
  { startTime: '17:00', endTime: '18:00', session: 'Evening', displayOrder: 5 },
  { startTime: '18:00', endTime: '19:00', session: 'Evening', displayOrder: 6 },
  { startTime: '19:00', endTime: '20:00', session: 'Evening', displayOrder: 7 },
  { startTime: '20:00', endTime: '21:00', session: 'Evening', displayOrder: 8 },
  { startTime: '21:00', endTime: '22:00', session: 'Evening', displayOrder: 9 },
  { startTime: '22:00', endTime: '23:00', session: 'Evening', displayOrder: 10 },
];

// Insert time slots to database
const insertTimeSlots = async () => {
  try {
    // Remove any existing time slots
    await TimeSlot.deleteMany({});
    
    // Insert new time slots
    await TimeSlot.insertMany(timeSlots);
    
    console.log('Time slots initialized successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error initializing time slots:', error);
    mongoose.disconnect();
  }
};

insertTimeSlots();