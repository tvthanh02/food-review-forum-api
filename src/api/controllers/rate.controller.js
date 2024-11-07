const Rate = require('../models/rate.model');
class RateController {
  static async getRateByPostId(postId) {
    try {
      const rates = await Rate.find({ post_id: postId })
        .populate('user_info', 'user_name avatar')
        .exec();
      return {
        data: rates,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async createRate(rate, postId, userId) {
    try {
      const newRate = await Rate.create({
        rate,
        post_id: postId,
        user_id: userId,
      });
      await newRate.save();
      return {
        data: newRate,
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

module.exports = RateController;
