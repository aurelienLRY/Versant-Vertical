const Reservation = require('../database/models/reservation');

// Create
exports.createReservation = (req, res) => {
  const newReservation = new Reservation(req.body);
  newReservation.save()
    .then(() => res.status(201).json({ message: 'Reservation created' }))
    .catch(err => res.status(400).json({ error: err }));
};

// Read
exports.getAllReservations = (req, res) => {
  Reservation.find()
    .then(reservations => res.status(200).json(reservations))
    .catch(err => res.status(400).json({ error: err }));
};

exports.getOneReservation = (req, res) => {
  Reservation.findById(req.params.id)
    .then(reservation => res.status(200).json(reservation))
    .catch(err => res.status(404).json({ error: err }));
};

// Update
exports.updateReservation = (req, res) => {
  Reservation.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(200).json({ message: 'Reservation updated' }))
    .catch(err => res.status(400).json({ error: err }));
};

// Delete
exports.deleteReservation = (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Reservation deleted' }))
    .catch(err => res.status(400).json({ error: err }));
};