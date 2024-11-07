const Post = require('../models/post.model');

class PostController {
  static async getAllPosts(queries) {
    const { page = 1, limit = 20 } = queries;
    try {
      const posts = await Post.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        data: {
          data: posts,
          meta: {
            total: posts.length,
            currentPage: +page,
            totalPages: Math.ceil(posts.length / limit),
          },
        },
      };
    } catch (error) {
      return {
        data: [],
        message: error.message,
        error: 1,
      };
    }
  }

  static async getDetailPost(postId) {
    try {
      const data = await Post.findById(postId).exec();
      return {
        data,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
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
      await post.save();
      return {
        data: post,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
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
      return {
        data: post,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async deletePost(postId) {
    try {
      const post = await Post.findByIdAndDelete(postId).exec();
      return {
        data: post._id,
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

module.exports = PostController;
