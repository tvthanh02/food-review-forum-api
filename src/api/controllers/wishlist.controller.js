const Wishlist = require('../models/wishlist.model');
const { createResponse } = require('../helpers');

class WishlistController {
  static async getWishlistByUserId(userId, queries) {
    const { page = 1, limit = 20 } = queries;

    try {
      const wishlists = await Wishlist.find({ user_id: userId })
        .populate('post_info')
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return createResponse(
        'success',
        'get user wishlist successfully',
        wishlists?.map((item) => item.post_info) ?? [],
        null,
        {
          total: wishlists?.length ?? 0,
          currentPage: +page,
          totalPages: Math.ceil(wishlists?.length / limit) ?? 0,
        }
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
