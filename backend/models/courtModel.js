const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema(
  {
    courtNumber: {
      type: Number,
      required: true,
      unique: true,
      enum: [1, 2, 3],
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Indoor",
    },
    basePrice: {
      type: Number,
      default: 400,
    },
    extraPersonPrice: {
      type: Number,
      default: 100,
    },
    status: {
      type: String,
      enum: ["Available", "Maintenance"],
      default: "Available",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Court = mongoose.model("Court", courtSchema);

module.exports = Court;
