const User = require('../database/models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.login = async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({message: 'Utilisateur non trouvé'});
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(400).send({message: 'Password incorrect'});
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);
    res.status(200).send({token:token, username: user.username});
  } catch (error) {
    res.status(500).send({message: 'Erreur serveur'});
  }};