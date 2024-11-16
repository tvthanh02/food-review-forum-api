const User = require('../models/user.model');
const BlacklistToken = require('../models/blacklist-token.model');
const { compare, hash } = require('../helpers/bcrypt.helper');
const jwt = require('jsonwebtoken');
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
        return { data: null, message: 'Password incorrect!', error: 1 };

      const payload = { uid: currentUser._id, role: currentUser.role };

      const [accessToken, refreshToken] = [
        generateAccessToken(payload),
        generateRefreshToken(payload),
      ];
      return {
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  static async register(email, password) {
    try {
      const hashedPassword = await hash(password);
      const user = await User.create({
        email: email,
        password: hashedPassword,
        role: 'user',
      });
      user.save();

      return {
        data: user,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  static async logout(accessToken, refreshToken) {
    try {
      const result = await BlacklistToken.create({ accessToken, refreshToken });
      result.save();

      return {
        data: result,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async refresh(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, getPublicKey());
      if (!payload)
        return {
          data: null,
          error: 1,
          message: 'Token is not valid!',
        };

      const newAccessToken = generateAccessToken({
        uid: payload.uid,
        role: payload.role,
      });

      return {
        data: {
          accessToken: newAccessToken,
        },
        message: 'Refresh new token successfully',
      };
    } catch (error) {
      return {
        data: null,
        error: 1,
        message: error.message,
      };
    }
  }
}

module.exports = AuthController;
