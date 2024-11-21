const Comment = require('../models/comment.model');
const { createResponse } = require('../helpers');
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
      return createResponse(
        'success',
        'Get comments successfully',
        result,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get comments',
        detail: error.message,
        source: 'controller/comment/getCommentByPostId',
      });
    }
  }
  static async getReplyByCommentId(commentId) {
    try {
      const comments = await Comment.find({ parent_id: commentId })
        .populate('user', 'user_name avatar')
        .populate('reply_to_user', 'user_name avatar')
        .sort({ created_at: 1 })
        .exec();
      return createResponse(
        'success',
        'Get comments successfully',
        comments,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get comments',
        detail: error.message,
        source: 'controller/comment/getReplyByCommentId',
      });
    }
  }

  static async createComment(data) {
    try {
      const comment = await Comment.create(data);
      return createResponse(
        'success',
        'Create comment successfully',
        comment,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create comment',
        detail: error.message,
        source: 'controller/comment/createComment',
      });
    }
  }

  static async updateComment(commentId, data) {
    try {
      const comment = await Comment.findByIdAndUpdate(commentId, data, {
        new: true,
        runValidators: true,
      }).exec();
      return createResponse(
        'success',
        'Update comment successfully',
        comment,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update comment',
        detail: error.message,
        source: 'controller/comment/updateComment',
      });
    }
  }

  static async deleteComment(commentId) {
    try {
      const comment = await Comment.findByIdAndDelete(commentId).exec();

      return createResponse(
        'success',
        'Delete comment successfully',
        comment._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when delete comment',
        detail: error.message,
        source: 'controller/comment/deleteComment',
      });
    }
  }
}

module.exports = CommentController;
