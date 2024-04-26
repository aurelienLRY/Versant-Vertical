const customerSession = require("../database/models/customerSession");
const sessions = require("../database/models/session");
const mongoose = require("mongoose");

//create
exports.createCustomerSession = async (req, res, next) => {
    try {
      const sessionId = req.body.sessionId;
      const placesReserved = req.body.number_of_people;
  
      const session = await sessions.findById(sessionId);
      if (!session) {
        const error = new Error("Session non trouvé");
        error.statusCode = 404;
        return next(error);
      }
      if (session.placesReserved + placesReserved > session.placesMax) {
        const error = new Error("Pas assez de places disponibles");
        error.statusCode = 400;
        return next(error);
      }
      session.placesReserved += placesReserved;
      const updateSession = await sessions.findByIdAndUpdate(sessionId, session, {
        new: true,
      });
      if (!updateSession) {
        const error = new Error("Session non trouvé");
        error.statusCode = 404;
        return next(error);
      } else {
        const newCustomerSession = new customerSession(req.body);
        await newCustomerSession.save();
        res.status(201).json({newCustomerSession , updateSession});
      }
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      next(error);
    } 
};

//read
exports.getAllCustomerSessions = async (req, res, next) => {
  try {
    const allSessions = await customerSession.find();
    if (allSessions.length === 0) {
      const error = new Error("Aucune Session trouvé");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(allSessions);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

//get one session customer
exports.getOneCustomerSession = async (req, res, next) => {
  try {
    const session = await customerSession.findById(req.params.id);
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

//update
exports.updateCustomerSession = async (req, res, next) => {
  try {
    const session = await customerSession.findByIdAndUpdate(
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

//delete
exports.deleteCustomerSession = async (req, res, next) => {
  try {
    const session = await customerSession.findByIdAndDelete(req.params.id);
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
