const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model('Wishlist', wishlistSchema);
