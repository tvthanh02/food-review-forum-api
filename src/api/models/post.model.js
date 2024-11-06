const mongoose = require('mongoose');
const { POST_STATUS } = require('../../constants');

const postSchema = new mongoose.Schema(
  {
    position: String,
    food_name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    province: {
      type: String,
    },
    maps: {
      latitude: String,
      longitude: String,
    },
    description: String,
    thumbnail: String,
    images: [String],
    videos: [String],
    hashtags: String,
    status: {
      type: String,
      enum: POST_STATUS,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
