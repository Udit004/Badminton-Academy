const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI); // Debug log
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
