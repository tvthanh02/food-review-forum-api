const Rate = require('../models/rate.model');
const { createResponse } = require('../helpers');
class RateController {
  static async getRateByPostId(postId) {
    try {
      const rates = await Rate.find({ post_id: postId })
        .populate('user_info', 'user_name avatar')
        .exec();
      return createResponse('success', 'Get rates successfully', rates, null);
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get rates',
        detail: error.message,
        source: 'controller/rate/getRateByPostId',
      });
    }
  }

  static async createRate(rate, postId, userId) {
    try {
      const newRate = await Rate.create({
        rate,
        post_id: postId,
        user_id: userId,
      });
      return createResponse(
        'success',
        'Create rate successfully',
        newRate,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create rate',
        detail: error.message,
        source: 'controller/rate/createRate',
      });
    }
  }
}

module.exports = RateController;
