const { PAGE, LIMIT } = require('../../constants');
const { getSearchQueries } = require('../helpers');
const ReportType = require('../models/report-type.model');
class ReportTypeController {
  static async getAllReportTypes(searchQueries) {
    const { page = PAGE, limit = LIMIT, status } = searchQueries;

    const queries = getSearchQueries([
      { fieldName: 'status', searchValue: status },
    ]);

    try {
      const reportTypes = await ReportType.find(queries)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        data: {
          data: reportTypes,
          meta: {
            total: reportTypes.length,
            currentPage: +page,
            totalPages: Math.ceil(reportTypes.length / limit),
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
  static async getReportTypeDetail(id) {
    try {
      const reportType = await ReportType.findById(id).exec();
      return {
        data: reportType,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }
  static async createReportType({ name, status }) {
    try {
      const reportType = await ReportType.create({
        name,
        status,
      });
      await reportType.save();
      return {
        data: reportType,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async deleteReportType(reportTypeId) {
    try {
      const reportType =
        await ReportType.findByIdAndDelete(reportTypeId).exec();
      return {
        data: reportType._id,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        error: 1,
      };
    }
  }

  static async updateReportType(reportTypeId, updateData) {
    const updateObject = Object.fromEntries(
      Object.entries(updateData).filter(
        // eslint-disable-next-line no-unused-vars
        ([_, value]) => value !== undefined && value !== null
      )
    );
    try {
      const reportType = await ReportType.findByIdAndUpdate(
        reportTypeId,
        updateObject,
        {
          new: true,
          runValidators: true,
        }
      ).exec();
      return {
        data: reportType,
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

module.exports = ReportTypeController;
