const Spot = require('../database/models/Spots');

// Create a spot
exports.createSpot = async (req, res, next) => {
  try {
    const spot = new Spot(req.body);
    await spot.save();
    res.status(201).json({ message: 'Lieu créé avec succès ', spot });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

// Read all spot 
exports.getAllSpots = async (req, res, next) => {
  try {
    const spots = await Spot.find();
    res.status(200).json(spots);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
// Read one spot
exports.getOneSpot = async (req, res, next) => {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) {
      const error = new Error('Lieu non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(spot);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 404;
    }
    next(error);
  }
};

// Update a spot
exports.updateSpot = async (req, res, next) => {
  try {
    const spot = await Spot.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if (!spot) {
      const error = new Error('lieu non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(spot);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

// Delete a spot
exports.deleteSpot = async (req, res, next) => {
  try {
    const spot = await Spot.findByIdAndRemove(req.params.id);
    if (!spot) {
      const error = new Error('lieu non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: 'Lieu supprimé avec succès' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};