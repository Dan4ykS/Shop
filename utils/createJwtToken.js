const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (data, lifetime = '1h') => {
  return jwt.sign(data, config.JWTSECRET, { expiresIn: lifetime });
};
