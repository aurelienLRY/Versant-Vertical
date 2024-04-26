const sessions = require("../database/models/session");

// Create
exports.createSession = async (req, res, next) => {
  try {
    const session = new sessions(req.body);
    await session.save();
    res.status(201).json({ message: "Session créer avec succès ", session });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

// Read
exports.getAllSessions = async (req, res, next) => {
  try {
    const allSession = await sessions.find();
    if (allSession.length === 0) {
      const error = new Error("Aucune Session trouvé");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(allSession);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getOneSession = async (req, res, next) => {
  try {
    const session = await sessions.findById(req.params.id);
    if (!session) {
      const error = new Error("Session non trouvé");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(session);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 404;
    }
    next(error);
  }
};

// Update
exports.updateSession = async (req, res, next) => {
  try {
    const session = await sessions.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!session) {
      const error = new Error("Session non trouvé");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(session);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

// Delete
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await sessions.findByIdAndDelete(req.params.id);
    if (!session) {
      const error = new Error("Session non trouvé");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "Session supprimé avec succès" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
