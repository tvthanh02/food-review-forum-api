const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });
const process = require('node:process');
const BlacklistToken = require('../models/blacklist-token.model');
const HttpResponseHandler = require('../helpers/http-response-handler.helper');
const checkLogin = async (req, res, next) => {
  const { authorization: accessToken } = req.headers;

  if (!accessToken) {
    HttpResponseHandler.Unauthorized(res);
  }

  const [type, token] = accessToken?.split(' ') ?? [];
  if (type !== 'Bearer') {
    HttpResponseHandler.Unauthorized(res);
  }

  const isTokenBlacklisted =
    (await BlacklistToken.countDocuments({ accessToken: token })) === 0;

  const isValid = Boolean(
    jwt.verify(token, process.env.SECRET_KEY) && isTokenBlacklisted
  );
  if (!isValid) {
    HttpResponseHandler.Unauthorized(res);
  }

  next();
};

const checkAdmin = async (req, res, next) => {
  checkLogin(req, res, next);
  const { authorization: accessToken } = req.headers;
  const { role } = jwt.verify(accessToken, process.env.SECRET_KEY);

  if (role !== 'admin') {
    HttpResponseHandler.Forbidden(res);
    return;
  }
  next();
};

module.exports = {
  checkLogin,
  checkAdmin,
};
