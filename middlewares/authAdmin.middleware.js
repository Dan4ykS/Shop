const config = require('../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authentication.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    const decoded = jwt.verify(token, config.JWTSECRET);
    const user = await User.findById(decoded.userId);
    if (user.userName !== 'admin') {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    req.admin = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
};
