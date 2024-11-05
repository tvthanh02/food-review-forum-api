const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category_name: String,
    description: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);
categorySchema.virtual('posts', {
  ref: 'PostCategory',
  localField: '_id',
  foreignField: 'categoryId',
});

module.exports = new mongoose.model('Category', categorySchema);
