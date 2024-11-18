const User = require('../models/user.model');
class UserController {
  static async getAllUsers(queries) {
    const { page = 1, limit = 20 } = queries;
    try {
      const listUsers = await User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        data: {
          data: listUsers.map((user) => ({
            _id: user._id,
            email: user.email,
            avatar: user.avatar,
            user_name: user.user_name,
            social_links: user.social_links,
            bio: user.bio,
          })),
          meta: {
            total: listUsers.length,
            currentPage: +page,
            totalPages: Math.ceil(listUsers.length / limit),
          },
        },
      };
    } catch (error) {
      return {
        data: [],
        message: error.message,
        error: 1,
      };
    }
  }

  static async getDetailUser(userId) {
    try {
      const user = await User.findById(userId).exec();
      return {
        data: {
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          user_name: user.user_name,
          social_links: user.social_links,
          role: user.role,
          bio: user.bio,
        },
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async updateUser(userId, data) {
    try {
      const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true,
      }).exec();
      return {
        data: user,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId).exec();
      return {
        data: user._id,
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

module.exports = UserController;
