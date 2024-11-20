const { getSearchQueries } = require('../helpers');
const Category = require('../models/category.model');
class CategoryController {
  static async getAllCategories(searchQueries) {
    const { page = 1, limit = 20, status } = searchQueries;

    const queries = getSearchQueries([
      { fieldName: 'status', searchValue: status },
    ]);

    try {
      const categories = await Category.find(queries)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        data: {
          data: categories,
          meta: {
            total: categories.length,
            currentPage: +page,
            totalPages: Math.ceil(categories.length / limit),
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

  static async createCategory(data) {
    try {
      const category = await Category.create({
        category_name: data.category_name,
        description: data.description ? data.description : '',
      });
      category.save();
      return {
        data: category,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async getDetailCategory(categoryId) {
    try {
      const data = await Category.findById(categoryId).exec();
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

  static async updateCategory(categoryId, data) {
    try {
      const category = await Category.findByIdAndUpdate(categoryId, data, {
        new: true,
        runValidators: true,
      }).exec();
      return {
        data: category,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async deleteCategory(categoryId) {
    try {
      const category = await Category.findByIdAndDelete(categoryId).exec();
      return {
        data: category._id,
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

module.exports = CategoryController;
