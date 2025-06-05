// scripts/initCourts.js

const mongoose = require('mongoose');
const Court = require('../models/courtModel');
const dotenv = require('dotenv');

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for court initialization'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define your three courts
const courts = [
  { courtNumber: 1, name: 'Court 1', type: 'Indoor', basePrice: 400, extraPersonPrice: 100, status: 'Available' },
  { courtNumber: 2, name: 'Court 2', type: 'Indoor', basePrice: 400, extraPersonPrice: 100, status: 'Available' },
  { courtNumber: 3, name: 'Court 3', type: 'Indoor', basePrice: 400, extraPersonPrice: 100, status: 'Available' }
];

// Insert courts to database
const insertCourts = async () => {
  try {
    // Remove any existing courts
    await Court.deleteMany({});
    
    // Insert new courts
    await Court.insertMany(courts);
    
    console.log('Courts initialized successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error initializing courts:', error);
    mongoose.disconnect();
  }
};

insertCourts();