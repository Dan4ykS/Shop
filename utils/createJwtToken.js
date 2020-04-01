const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (data) => {
  return jwt.sign(data, config.JWTSECRET, { expiresIn: '5h' });
};
