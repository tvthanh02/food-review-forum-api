const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: String,
    images: [String],
    videos: [String],
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
    reply_to_user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

commentSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

commentSchema.virtual('reply_to_user', {
  ref: 'User',
  localField: 'reply_to_user_id',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('Comment', commentSchema);
