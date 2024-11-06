const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
