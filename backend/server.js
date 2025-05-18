const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
 const connectDB = require('./config/db');
const { verifyToken } = require('./middleware/authMiddleware');
require('./config/firebase'); // Initialize Firebase Admin

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.get('/', (req, res) => {
    res.send("backend is running");
});

// Protected routes - apply verifyToken middleware
// Use middleware for specific route groups that need authentication
const userRoutes = require('./routes/usersroutes');
const bookingRoutes = require('./routes/bookingroutes');

app.use('/api/users', verifyToken, userRoutes);
app.use('/api/booking', verifyToken, bookingRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

});