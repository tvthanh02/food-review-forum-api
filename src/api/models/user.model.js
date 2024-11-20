const mongoose = require('mongoose');
const { USER_ROLE, SUB_ADMIN_STATUS } = require('../../constants');

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: {
      type: String,
      enum: [...USER_ROLE],
      default: 'user',
    },
    avatar: String,
    user_name: String,
    social_links: [
      {
        title: String,
        link: String,
      },
    ],
    bio: String,
    sub_admin_status: {
      type: String,
      enum: [...SUB_ADMIN_STATUS],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
