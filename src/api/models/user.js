const mongoose = require('mongoose');
const { USER_ROLE } = require('../../constants');

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: {
      type: String,
      enum: USER_ROLE,
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
