const mongoose = require('mongoose');
const { POST_STATUS } = require('../../constants');

const postSchema = new mongoose.Schema(
  {
    position: String,
    food_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    province: {
      type: String,
      required: true,
    },
    maps: {
      latitude: String,
      longitude: String,
    },
    description: String,
    thumbnail: {
      type: String,
      required: true,
    },
    images: [String],
    videos: [String],
    hashtags: String,
    status: {
      type: String,
      enum: [...POST_STATUS],
      default: 'pending',
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
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Post', postSchema);
