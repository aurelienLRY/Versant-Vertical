const User = require('../database/models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({username: req.body.username, email: req.body.email ,password: hashedPassword});
    await user.save();
    res.send({message: 'Utilisateur crée avec succès'});
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.send(user);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.send(user);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.statusCode = 404;
      return next(error);
    }
    res.send(user);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};