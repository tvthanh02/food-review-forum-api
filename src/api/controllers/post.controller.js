const Post = require('../models/post.model');
const { createResponse, getSearchQueries } = require('../helpers');
const { MODE_SEARCH } = require('../../constants');

class PostController {
  static async getAllPosts(queries) {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      food_name,
      province,
      user_id,
    } = queries;
    const queriesSearch = getSearchQueries([
      { key: 'status', value: status, mode: MODE_SEARCH.EXACT },
      { key: 'category', value: category, mode: MODE_SEARCH.IN },
      { key: 'food_name', value: food_name, mode: MODE_SEARCH.CONTAIN },
      { key: 'province', value: province, mode: MODE_SEARCH.CONTAIN },
      { key: 'user_id', value: user_id, mode: MODE_SEARCH.EXACT },
    ]);
    try {
      const posts = await Post.find(queriesSearch)
        .sort({ created_at: -1 })
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

  static async updatePostStatus(postId, status) {
    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { status },
        {
          new: true,
          runValidators: true,
        }
      ).exec();
      return createResponse('success', 'Update post successfully', post, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update post',
        detail: error.message,
        source: 'controller/post/updatePostStatus',
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
