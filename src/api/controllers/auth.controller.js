const User = require('../models/user.model');
const BlacklistToken = require('../models/blacklist-token.model');
const { compare, hash } = require('../helpers/bcrypt.helper');
const jwt = require('jsonwebtoken');
const { createResponse } = require('../helpers');
const {
  generateAccessToken,
  generateRefreshToken,
  getPublicKey,
} = require('../helpers/jwt.helper');

class AuthController {
  static async login(email, password) {
    try {
      const currentUser = await User.findOne({ email }).exec();

      if (!currentUser)
        return { data: null, message: 'User not exist', error: 1 };
      const isValid = await compare(password, currentUser.password);

      if (!isValid)
        return createResponse('error', null, null, {
          status: 404,
          title: 'Email or Password is incorrect',
          detail: 'Email is not exist',
          source: 'controller/auth/login',
        });

      const payload = { uid: currentUser._id, role: currentUser.role };

      const [accessToken, refreshToken] = [
        generateAccessToken(payload),
        generateRefreshToken(payload),
      ];
      return createResponse(
        'success',
        'Login successfully',
        {
          accessToken,
          refreshToken,
        },
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Email or Password is incorrect',
        detail: error.message,
        source: 'controller/auth/login',
      });
    }
  }

  static async register(email, password, userName) {
    try {
      const hashedPassword = await hash(password);
      const user = await User.create({
        email: email,
        password: hashedPassword,
        user_name: userName,
        role: 'user',
      });
      return createResponse(
        'success',
        'Register successfully',
        {
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          user_name: user.user_name,
        },
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when register',
        detail: error.message,
        source: 'controller/auth/register',
      });
    }
  }

  static async logout(accessToken, refreshToken) {
    try {
      const result = await BlacklistToken.create({ accessToken, refreshToken });
      return createResponse('success', 'Logout successfully', result, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when logout',
        detail: error.message,
        source: 'controller/auth/logout',
      });
    }
  }

  static async refresh(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, getPublicKey());
      if (!payload)
        return createResponse('error', null, null, {
          status: 500,
          title: 'Have error when refresh token',
          detail: 'Invalid refresh token',
          source: 'controller/auth/refresh',
        });

      const newAccessToken = generateAccessToken({
        uid: payload.uid,
        role: payload.role,
      });

      return createResponse(
        'success',
        'Refresh token successfully',
        {
          accessToken: newAccessToken,
        },
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when refresh token',
        detail: error.message,
        source: 'controller/auth/refresh',
      });
    }
  }
}

module.exports = AuthController;
