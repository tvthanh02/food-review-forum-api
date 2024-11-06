const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });
const process = require('node:process');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 15 * 60,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '7d',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
