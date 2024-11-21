const { MODE_SEARCH } = require('../../constants');
const { getSearchQueries, createResponse } = require('../helpers');
const Category = require('../models/category.model');
class CategoryController {
  static async getAllCategories(searchQueries) {
    const { page = 1, limit = 20, status } = searchQueries;

    const queries = getSearchQueries([
      { fieldName: 'status', searchValue: status, mode: MODE_SEARCH.EXACT },
    ]);

    try {
      const categories = await Category.find(queries)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      return createResponse(
        'success',
        'Get all categories successfully',
        categories,
        null,
        {
          total: categories.length ?? 0,
          currentPage: +page,
          totalPages: Math.ceil(categories.length / limit) ?? 0,
        }
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get all categories',
        detail: error.message,
        source: 'controller/category/getAllCategories',
      });
    }
  }

  static async createCategory(data) {
    try {
      const category = await Category.create({
        category_name: data.category_name,
        description: data.description ? data.description : '',
        status: data.status,
      });
      return createResponse(
        'success',
        'Create category successfully',
        category,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create category',
        detail: error.message,
        source: 'controller/category/createCategory',
      });
    }
  }

  static async getDetailCategory(categoryId) {
    try {
      const data = await Category.findById(categoryId).exec();
      if (!data)
        return createResponse('error', null, null, {
          status: 404,
          title: 'Category not exist',
          detail: 'Category is not exist',
          source: 'controller/category/getDetailCategory',
        });

      return createResponse(
        'success',
        'Get detail category successfully',
        data,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get detail category',
        detail: error.message,
        source: 'controller/category/getDetailCategory',
      });
    }
  }

  static async updateCategory(categoryId, data) {
    try {
      const category = await Category.findByIdAndUpdate(categoryId, data, {
        new: true,
        runValidators: true,
      }).exec();

      if (!category) {
        return createResponse('error', null, null, {
          status: 404,
          title: 'Category not exist',
          detail: 'Category is not exist',
          source: 'controller/category/updateCategory',
        });
      }

      return createResponse(
        'success',
        'Update category successfully',
        category,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update category',
        detail: error.message,
        source: 'controller/category/updateCategory',
      });
    }
  }

  static async deleteCategory(categoryId) {
    try {
      const category = await Category.findByIdAndDelete(categoryId).exec();

      if (!category)
        return createResponse('error', null, null, {
          status: 404,
          title: 'Category not exist',
          detail: 'Category is not exist',
          source: 'controller/category/deleteCategory',
        });

      return createResponse(
        'success',
        'Delete category successfully',
        category._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when delete category',
        detail: error.message,
        source: 'controller/category/deleteCategory',
      });
    }
  }
}

module.exports = CategoryController;
