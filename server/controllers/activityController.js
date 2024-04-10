const Activity = require('../database/models/activity');

// Create
exports.createActivity = (req, res) => {
    const newActivity = new Activity(req.body);
    newActivity.save()
        .then(() => res.status(201).json({ activity: newActivity}))
        .catch(err => res.status(400).json({ error: err }));
};

// Read
exports.getAllActivities = (req, res) => {
    Activity.find()
        .then(activities => res.status(200).json(activities))
        .catch(err => res.status(400).json({ error: err }));
};

exports.getOneActivity = (req, res) => {
    Activity.findById(req.params.id)
        .then(activity => res.status(200).json(activity))
        .catch(err => res.status(404).json({ error: err }));
};


// Update
exports.updateActivity = (req, res) => {
    Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(activity => res.status(200).json(activity))
        .catch(err => res.status(400).json({ error: err }));
};

// Delete
exports.deleteActivity = (req, res) => {
    Activity.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Activity deleted' }))
        .catch(err => res.status(400).json({ error: err }));
};