// models/bookingModel.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: true,
    },
    numberOfPlayers: {
      type: Number,
      required: true,
      min: 1,
    },
    playerNames: {
      type: [String],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentId: {
      type: String,
      default: "",
    },
    cancellationReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to prevent double bookings
bookingSchema.index(
  { court: 1, bookingDate: 1, timeSlot: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["Pending", "Confirmed"] } },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
