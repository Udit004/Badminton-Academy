const mongoose = require('mongoose');

const timeSlotShema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  session: {
    type: String,
    enum: ['Morning', 'Evening'],
    required: true
  },
  displayOrder: {
    type: Number,
    required: true
  }

});

timeSlotShema.index({ startTime: 1, endTime: 1},{unique: true});
const Timeslot = mongoose.model('TimeSlot',timeSlotShema);
module.exports = Timeslot;