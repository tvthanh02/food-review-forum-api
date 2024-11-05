const mongooes = require('mongoose');

const postCategorySchema = new mongooes.Schema(
  {
    postId: {
      type: mongooes.Types.ObjectId,
      ref: 'Post',
    },
    categoryId: {
      type: mongooes.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    _id: false,
  }
);

module.exports = new mongooes.model('PostCategory', postCategorySchema);
