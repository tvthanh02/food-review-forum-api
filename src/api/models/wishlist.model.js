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
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

wishlistSchema.virtual('post_info', {
  ref: 'Post',
  localField: 'post_id',
  foreignField: '_id',
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
