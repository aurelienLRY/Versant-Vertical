const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  activity: { type: String, required: true },
  spot: { type: Number, required: true },
  userMax: { type: String, required: true },
  placesReserved: { type: String, required: true },

});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;