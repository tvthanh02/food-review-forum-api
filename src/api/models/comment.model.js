const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: String,
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
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
