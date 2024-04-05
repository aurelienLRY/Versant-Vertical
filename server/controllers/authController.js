const User = require('../database/models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.login = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({message: 'User not found'});
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(400).send({message: 'Invalid password'});
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);
    res.send({token});
  };