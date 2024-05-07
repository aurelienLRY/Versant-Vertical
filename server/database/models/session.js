const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  status: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  activity: { type: String, required: true },
  spot: { type: String, required: true },
  placesMax: { type: Number, required: true },
  placesReserved: { type: Number, required: true },

});

const session = mongoose.model('session', sessionSchema);

module.exports = session;