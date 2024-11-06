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
  ref: 'Post',
  localField: '_id',
  foreignField: 'categories',
});

module.exports = mongoose.model('Category', categorySchema);
