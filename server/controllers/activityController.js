const Activity = require("../database/models/activity");

// Create
exports.createActivity = async (req, res, next) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json({ activity: newActivity });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Read
exports.getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getOneActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      const error = new Error('Activity not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(activity);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update
exports.updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      const error = new Error('Activity not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(activity);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete
exports.deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      const error = new Error('Activity not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};