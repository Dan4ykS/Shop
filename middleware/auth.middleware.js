const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authentication.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const decoded = jwt.verify(token, config.JWTSECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
};
