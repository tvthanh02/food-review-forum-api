const mongooes = require('mongoose');

const reactionCommentSchema = new mongooes.Schema(
  {
    user: {
      type: mongooes.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: mongooes.Types.ObjectId,
      ref: 'Comment',
    },
    react_icon: {
      type: mongooes.Types.ObjectId,
      ref: 'Reaction',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = new mongooes.model('ReactionComment', reactionCommentSchema);
