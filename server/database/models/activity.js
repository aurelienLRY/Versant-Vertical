const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },

  half_day: {
    type: Boolean,
    required: true,
  },
  full_day: {
    type: Boolean,
    required: true,
  },
  price_half_day:{
    type: Number, 
    required: false,
  }, 
  price_full_day:{
    type: Number, 
    required: false,
  }, 

  min_age: {
    type: Number,
    required: true,
  },
  max_OfPeople: {
    type: Number,
    required: true,
  },
  min_OfPeople: {
    type: Number,
    required: true,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
