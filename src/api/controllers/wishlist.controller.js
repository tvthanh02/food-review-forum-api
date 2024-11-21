const Wishlist = require('../models/wishlist.model');
const { createResponse } = require('../helpers');

class WishlistController {
  static async getWishlistByUserId(userId) {
    try {
      const wishlist = await Wishlist.find({ user_id: userId })
        .populate('post_info')
        .exec();
      return createResponse(
        'success',
        'get user wishlist successfully',
        wishlist?.map((item) => item.post_info) ?? [],
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get wislist',
        detail: error.message,
        source: 'controller/wishlist/getWishlistByUserId',
      });
    }
  }

  static async createWishlist(data) {
    try {
      const newWishlist = await Wishlist.create(data);
      return createResponse(
        'success',
        'Create wishlist successfully',
        newWishlist._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create wishlist',
        detail: error.message,
        source: 'controller/wishlist/createWishlist',
      });
    }
  }

  static async deleteWishlist(wishlistId, currentUserId) {
    try {
      const wishlist = await Wishlist.findById(wishlistId).exec();

      if (wishlist.user_id.toString() !== currentUserId) {
        return createResponse('error', null, null, {
          status: 403,
          title: 'Forbidden',
          detail: "You don't have permission to delete this wishlist",
          source: 'controller/wishlist/deleteWishlist',
        });
      }

      await wishlist.remove();
      return createResponse(
        'success',
        'Delete wishlist successfully',
        wishlist._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when delete wishlist',
        detail: error.message,
        source: 'controller/wishlist/deleteWishlist',
      });
    }
  }

  static async clearWishlist(userId) {
    try {
      const wishlist = await Wishlist.deleteMany({ user_id: userId }).exec();
      return createResponse(
        'success',
        'Clear wishlist successfully',
        wishlist.deletedCount,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when clear wishlist',
        detail: error.message,
        source: 'controller/wishlist/clearWishlist',
      });
    }
  }
}

module.exports = WishlistController;
