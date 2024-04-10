const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;