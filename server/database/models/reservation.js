const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  activity: { type: String, required: true },
  user: { type: String, required: true },
  spots: { type: Number, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;