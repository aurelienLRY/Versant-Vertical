const Booking = require('../database/models/booking');

// Create
exports.createBooking = (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    booking.save();
    res.status(201).json({ message: 'Créneau créer avec succès ', booking });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
};}

// Read
exports.getAllBookings = async (req, res, next) => {
  try {
    const allBooking = await Booking.find();
    res.status(200).json(allBooking);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
};}


exports.getOneBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);  
    if (!booking) {
      const error = new Error('Créneau non trouvé');
      error.statusCode = 404;
      return next(error);
    }   
    res.status(200).json(booking);
  }
  catch (error) {
    if (!error.statusCode) {
      error.statusCode = 404;
    }
    next(error);  
  }
}

// Update
exports.updateBooking = async(req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if (!booking) {
      const error = new Error('Créneau non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(booking);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  } 
}

// Delete
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      const error = new Error('Créneau non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: 'Créneau supprimé avec succès' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
}