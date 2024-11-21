const { MODE_SEARCH } = require('../../constants');
const { getSearchQueries, createResponse } = require('../helpers');
const User = require('../models/user.model');
class UserController {
  static async getAllUsers(searchQueries) {
    const {
      page = 1,
      limit = 20,
      role,
      name,
      email,
      isLock,
      subadmin_status,
    } = searchQueries;

    const queries = getSearchQueries([
      { fieldName: 'role', searchValue: role, mode: MODE_SEARCH.EXACT },
      { fieldName: 'user_name', searchValue: name },
      { fieldName: 'email', searchValue: email, mode: MODE_SEARCH.EXACT },
      { fieldName: 'isLock', searchValue: isLock, mode: MODE_SEARCH.EXACT },
      {
        fieldName: 'subadmin_status',
        searchValue: subadmin_status,
        mode: MODE_SEARCH.EXACT,
      },
    ]);

    try {
      const listUsers = await User.find(queries)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const listUsersWithoutPassword = listUsers.map((user) => ({
        _id: user._id,
        email: user.email,
        avatar: user.avatar,
        user_name: user.user_name,
        role: user.role,
        bio: user.bio,
        social_links: user.social_links,
        isLock: user.isLock,
        status: user.status,
        subadmin_status: user.subadmin_status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      return createResponse(
        'success',
        'get list users successfully',
        listUsersWithoutPassword,
        null,
        {
          total: listUsers?.length ?? 0,
          currentPage: +page,
          totalPages: Math.ceil(listUsers?.length / limit) ?? 0,
          limit: +limit,
        }
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get list users',
        detail: error.message,
        source: 'controller/user/getAllUsers',
      });
    }
  }

  static async getDetailUser(userId) {
    try {
      const user = await User.findById(userId).exec();

      if (!user) {
        return createResponse('error', null, null, {
          status: 404,
          title: 'User not exist',
          detail: 'User not exist',
          source: 'controller/user/getDetailUser',
        });
      }

      return createResponse(
        'success',
        'get detail user successfully',
        {
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          user_name: user.user_name,
          social_links: user.social_links,
          role: user.role,
          bio: user.bio,
        },
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get detail user',
        detail: error.message,
        source: 'controller/user/getDetailUser',
      });
    }
  }

  static async updateUser(userId, data) {
    try {
      const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true,
      }).exec();
      return createResponse('success', 'Update user successfully', user, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update user',
        detail: error.message,
        source: 'controller/user/updateUser',
      });
    }
  }

  static async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId).exec();
      return createResponse(
        'success',
        'Delete user successfully',
        user._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when delete user',
        detail: error.message,
        source: 'controller/user/deleteUser',
      });
    }
  }
  static async banUser(userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          isLock: true,
        },
        {
          new: true,
          runValidators: true,
        }
      ).exec();
      return createResponse('success', 'Ban user successfully', user._id, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when ban user',
        detail: error.message,
        source: 'controller/user/banUser',
      });
    }
  }
}

module.exports = UserController;
