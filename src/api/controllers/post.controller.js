const Post = require('../models/post.model');
const { createResponse } = require('../helpers');

class PostController {
  static async getAllPosts(queries) {
    const { page = 1, limit = 20 } = queries;
    try {
      const posts = await Post.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return createResponse(
        'success',
        'Get all posts successfully',
        posts,
        null,
        {
          total: posts?.length ?? 0,
          currentPage: +page,
          totalPages: Math.ceil(posts?.length / limit) ?? 0,
        }
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get all posts',
        detail: error.message,
        source: 'controller/post/getAllPosts',
      });
    }
  }

  static async getDetailPost(postId) {
    try {
      const data = await Post.findById(postId).exec();

      if (!data)
        return createResponse('error', null, null, {
          status: 404,
          title: 'Post not exist',
          detail: 'Post is not exist',
          source: 'controller/post/getDetailPost',
        });

      return createResponse(
        'success',
        'Get detail post successfully',
        data,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get detail post',
        detail: error.message,
        source: 'controller/post/getDetailPost',
      });
    }
  }

  static async createPost(data) {
    try {
      const post = await Post.create({
        ...data,
        maps: JSON.parse(data?.maps ?? {}),
        categories: JSON.parse(data.categories),
        status: 'pending',
      });
      return createResponse('success', 'Create post successfully', post, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create post',
        detail: error.message,
        source: 'controller/post/createPost',
      });
    }
  }

  static async updatePost(postId, data) {
    if (data?.maps) data.maps = JSON.parse(data.maps ?? {});
    if (data?.categories) data.categories = JSON.parse(data.categories);

    try {
      const post = await Post.findByIdAndUpdate(postId, data, {
        new: true,
        runValidators: true,
      }).exec();
      return createResponse('success', 'Update post successfully', post, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update post',
        detail: error.message,
        source: 'controller/post/updatePost',
      });
    }
  }

  static async deletePost(postId) {
    try {
      const post = await Post.findByIdAndDelete(postId).exec();
      return createResponse(
        'success',
        'Delete post successfully',
        post._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when delete post',
        detail: error.message,
        source: 'controller/post/deletePost',
      });
    }
  }
}

module.exports = PostController;
