const Wishlist = require('../models/wishlist.model');

class WishlistController {
  static async getWishlistByUserId(userId) {
    try {
      const wishlist = await Wishlist.find({ user_id: userId })
        .populate('post_info')
        .exec();
      return {
        data: wishlist.map((item) => item.post_info),
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async createWishlist(data) {
    try {
      const newWishlist = await Wishlist.create(data);
      await newWishlist.save();
      return {
        data: newWishlist._id,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async deleteWishlist(wishlistId, currentUserId) {
    try {
      const wishlist = await Wishlist.findById(wishlistId).exec();

      if (wishlist.user_id.toString() !== currentUserId) {
        return {
          data: null,
          message: 'You are not authorized to delete this wishlist',
          error: 1,
          hasPermission: true,
        };
      }

      await wishlist.remove();
      return {
        data: wishlist._id,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async clearWishlist(userId) {
    try {
      const wishlist = await Wishlist.deleteMany({ user_id: userId }).exec();
      return {
        data: wishlist.deletedCount,
        message: 'Clear wishlist successfully',
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

module.exports = WishlistController;
