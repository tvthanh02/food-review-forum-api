const mongoose = require('mongoose');
const { CATEGORY_STATUS } = require('../../constants');

const categorySchema = new mongoose.Schema(
  {
    category_name: String,
    description: String,
    status: {
      type: String,
      enum: [...CATEGORY_STATUS],
      default: 'active',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);
categorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'categories',
});

module.exports = mongoose.model('Category', categorySchema);
