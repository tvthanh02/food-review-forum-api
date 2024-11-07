const { PAGE, LIMIT } = require('../../constants');
const ReportType = require('../models/report-type.model');
class ReportTypeController {
  static async getAllReportTypes(queries) {
    const { page = PAGE, limit = LIMIT } = queries;
    try {
      const reportTypes = await ReportType.find()
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
  static async createReportType(name) {
    try {
      const reportType = await ReportType.create({
        name,
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

  static async updateReportType(reportTypeId, updateName) {
    try {
      const reportType = await ReportType.findByIdAndUpdate(
        reportTypeId,
        {
          name: updateName,
        },
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
