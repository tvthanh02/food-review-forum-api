const jwt = require('jsonwebtoken');
const { getPublicKey } = require('../helpers/jwt.helper');
const BlacklistToken = require('../models/blacklist-token.model');
const HttpResponseHandler = require('../helpers/response-handler.helper');
const checkLogin = async (req, res, next) => {
  const { authorization: accessToken } = req.headers;

  if (!accessToken) {
    return HttpResponseHandler.Unauthorized(
      res,
      {
        status: 401,
        title: 'Unauthorized',
        detail: 'Access token not found',
        source: 'Middleware',
      },
      'error'
    );
  }

  const [type, token] = accessToken.split(' ');

  if (type !== 'Bearer') {
    return HttpResponseHandler.Unauthorized(
      res,
      {
        status: 401,
        title: 'Unauthorized',
        detail: 'Invalid token type',
        source: 'Middleware',
      },
      'error'
    );
  }

  try {
    const payload = jwt.verify(token, getPublicKey(), {
      algorithms: ['RS256'],
    });

    const isTokenBlacklisted =
      (await BlacklistToken.countDocuments({ accessToken: token })) > 0;

    if (isTokenBlacklisted) {
      return HttpResponseHandler.Unauthorized(
        res,
        {
          status: 401,
          title: 'Unauthorized',
          detail: 'Token is blacklisted',
          source: 'Middleware',
        },
        'error'
      );
    }

    req.payload = payload;

    next();
  } catch (error) {
    return HttpResponseHandler.Unauthorized(
      res,
      {
        status: 401,
        title: 'Unauthorized',
        detail: error.message,
        source: 'Middleware',
      },
      'error'
    );
  }
};
const isAdmin = async (req, res, next) => {
  const { role: currentUserRole } = req.payload;

  if (currentUserRole !== 'admin') {
    return HttpResponseHandler.Forbidden(
      res,
      {
        status: 403,
        title: 'Forbidden',
        detail: 'Access denied: Insufficient permissions.',
        source: 'Middleware',
      },
      'error'
    );
  }
  next();
};

const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const { role } = req.payload;

      if (!role) {
        return HttpResponseHandler.Forbidden(
          res,
          {
            status: 403,
            title: 'Forbidden',
            detail: 'Access denied: No role found.',
            source: 'Middleware',
          },
          'error'
        );
      }

      if (!allowedRoles.includes(role)) {
        return HttpResponseHandler.Forbidden(
          res,
          {
            status: 403,
            title: 'Forbidden',
            detail: 'Access denied: Insufficient permissions.',
            source: 'Middleware',
          },
          'error'
        );
      }

      next();
    } catch (error) {
      return HttpResponseHandler.InternalServerError(
        res,
        {
          status: 500,
          title: 'Internal Server Error',
          detail: error.message,
          source: 'Middleware',
        },
        'error'
      );
    }
  };
};

module.exports = {
  checkLogin,
  isAdmin,
  hasRole,
};
