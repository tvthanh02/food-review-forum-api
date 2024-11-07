const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      min: 1,
      max: 5,
    },
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
    user_id: {
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

rateSchema.virtual('user_info', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('Rate', rateSchema);
