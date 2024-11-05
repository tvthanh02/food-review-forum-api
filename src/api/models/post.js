const mongoose = require('mongoose');
const { POST_STATUS } = require('../../constants');

const postSchema = new mongoose.Schema(
  {
    position: String,
    food_name: String,
    user_post: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    province: {
      type: mongoose.Types.ObjectId,
      ref: 'Province',
    },
    location_map: {
      latitude: String,
      longitude: String,
    },
    description: String,
    thumbnail: String,
    images: [
      {
        _id: mongoose.Types.ObjectId,
        url: String,
      },
    ],
    videos: [
      {
        _id: mongoose.Types.ObjectId,
        url: String,
      },
    ],
    hashtags: String,
    status: {
      type: String,
      enum: POST_STATUS,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

postSchema.virtual('categories', {
  ref: 'PostCategory',
  localField: '_id',
  foreignField: 'postId',
});

module.exports = new mongoose.model('Post', postSchema);
