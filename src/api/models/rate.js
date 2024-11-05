const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      min: 1,
      max: 5,
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

module.exports = new mongoose.model('Rate', rateSchema);
