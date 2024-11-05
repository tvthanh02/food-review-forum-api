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
    timestamps: true,
  }
);

module.exports = new mongooes.model('ReactionComment', reactionCommentSchema);
