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

  static async createPost({ requestBody, requestFiles }) {
    const files = {};

    if (requestFiles.images)
      files.images = requestFiles.images.map((file) => file.path);

    if (requestFiles.thumbnail)
      files.thumbnail = requestFiles.thumbnail[0].path;

    if (requestFiles.videos)
      files.videos = requestFiles.videos.map((file) => file.path);

    try {
      const post = await Post.create({
        ...requestBody,
        maps: JSON.parse(requestBody?.maps ?? {}),
        categories: JSON.parse(requestBody.categories),
        status: 'pending',
        thumbnail: files.thumbnail,
        images: files.images,
        videos: files.videos,
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
