const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  activity: { type: String, required: true },
  spot: { type: Number, required: true },
  userMax: { type: String, required: true },
  placesReserved: { type: String, required: true },

});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;