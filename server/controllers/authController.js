const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.statusCode = 400;
      return next(error);
    }
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Password incorrect');
      error.statusCode = 400;
      return next(error);
    }
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);
    res.status(200).send({token:token, username: user.username});
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};