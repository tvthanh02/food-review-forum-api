const Comment = require('../models/comment.model');
class CommentController {
  static async getCommentByPostId(postId) {
    try {
      const comments = await Comment.find({ post_id: postId })
        .where('parent_id', null)
        .where('reply_to_user_id', null)
        .populate('user', 'user_name avatar')
        .exec();

      const result = [];

      for (const comment of comments) {
        const replies = await Comment.countDocuments({
          parent_id: comment._id,
        }).exec();
        result.push({ comment, replies });
      }
      return {
        data: result,
      };
    } catch (error) {
      return {
        data: [],
        message: error.message,
        error: 1,
      };
    }
  }
  static async getReplyByCommentId(commentId) {
    try {
      const comments = await Comment.find({ parent_id: commentId })
        .populate('user', 'user_name avatar')
        .populate('reply_to_user', 'user_name avatar')
        .sort({ created_at: 1 })
        .exec();
      return {
        data: comments,
      };
    } catch (error) {
      return {
        data: [],
        message: error.message,
        error: 1,
      };
    }
  }

  static async createComment(data) {
    try {
      const comment = await Comment.create(data);
      return {
        data: comment,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async updateComment(commentId, data) {
    try {
      const comment = await Comment.findByIdAndUpdate(commentId, data, {
        new: true,
        runValidators: true,
      }).exec();
      return {
        data: comment,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async deleteComment(commentId) {
    try {
      const comment = await Comment.findByIdAndDelete(commentId).exec();
      return {
        data: comment._id,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }
}

module.exports = CommentController;
