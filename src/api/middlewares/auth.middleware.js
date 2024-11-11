const jwt = require('jsonwebtoken');
require('dotenv').config();
const process = require('node:process');
const BlacklistToken = require('../models/blacklist-token.model');
const HttpResponseHandler = require('../helpers/response-handler.helper');
const checkLogin = async (req, res, next) => {
  const { authorization: accessToken } = req.headers;

  if (!accessToken) {
    return HttpResponseHandler.Unauthorized(res, 'No token provided');
  }

  const [type, token] = accessToken.split(' ');

  if (type !== 'Bearer') {
    return HttpResponseHandler.Unauthorized(res, 'Invalid token type');
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const isTokenBlacklisted =
      (await BlacklistToken.countDocuments({ accessToken: token })) > 0;

    if (isTokenBlacklisted) {
      return HttpResponseHandler.Unauthorized(res, 'Token is blacklisted');
    }

    req.payload = payload;

    next();
  } catch (error) {
    return HttpResponseHandler.Unauthorized(res, error.message);
  }
};
const isAdmin = async (req, res, next) => {
  const { role: currentUserRole } = req.payload;

  if (currentUserRole !== 'admin') {
    return HttpResponseHandler.Forbidden(res);
  }
  next();
};

module.exports = {
  checkLogin,
  isAdmin,
};
