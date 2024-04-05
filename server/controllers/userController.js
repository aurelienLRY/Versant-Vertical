const User = require('../database/models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({username: req.body.username, email: req.body.email ,password: hashedPassword});
    await user.save();
    res.send({message: 'User registered'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

exports.getOneUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send({message: 'User not found'});
  res.send(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!user) return res.status(404).send({message: 'User not found'});
  res.send(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send({message: 'User not found'});
  res.send(user);
};