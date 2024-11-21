const mongoose = require('mongoose');
const { USER_ROLE, SUB_ADMIN_STATUS } = require('../../constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [...USER_ROLE],
      default: 'user',
    },
    avatar: String,
    user_name: {
      type: String,
      required: true,
    },
    social_links: [
      {
        title: String,
        link: String,
      },
    ],
    bio: String,
    isLock: {
      type: Boolean,
      default: false,
    },
    subadmin_status: {
      type: String,
      enum: [...SUB_ADMIN_STATUS],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
