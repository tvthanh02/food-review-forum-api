const User = require('../models/user.model');
const BlacklistToken = require('../models/blacklist-token.model');
const { compare, hash } = require('../helpers/bcrypt.helper');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../helpers/jwt.helper');

class AuthController {
  static async login(email, password) {
    try {
      const currentUser = await User.findOne({ email }).exec();
      console.log('🚀 ~ AuthController ~ login ~ currentUser:', currentUser);

      if (!currentUser)
        return { data: null, message: 'User not exist', error: 1 };
      const isValid = await compare(password, currentUser.password);

      if (!isValid)
        return { data: null, message: 'Password incorrect!', error: 1 };

      const payload = { uid: currentUser._id, role: currentUser.role };

      console.log('🚀 ~ AuthController ~ login ~ payload:', payload);
      const [accessToken, refreshToken] = [
        generateAccessToken(payload),
        generateRefreshToken(payload),
      ];
      console.log('🚀 ~ AuthController ~ login ~ refreshToken:', refreshToken);
      console.log('🚀 ~ AuthController ~ login ~ accessToken:', accessToken);
      return {
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log('🚀 ~ AuthController ~ login ~ error:', error);

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
}

module.exports = AuthController;
