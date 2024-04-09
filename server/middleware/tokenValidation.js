
const jwt = require('jsonwebtoken');


module.exports.permission = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send({message: 'No token provided'});
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = payload.userId;
      next();
    } catch (e) {
      res.status(401).send({message: 'Invalid token'});
    }
  }