const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

rateSchema.virtual('user_info', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('Rate', rateSchema);
