

const  mongoose = require('mongoose');
const uri = process.env.MONGODB_URI 


const dbConnection = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');

  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnection;