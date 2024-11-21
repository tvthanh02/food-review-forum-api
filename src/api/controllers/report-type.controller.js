const { PAGE, LIMIT, MODE_SEARCH } = require('../../constants');
const { getSearchQueries, createResponse } = require('../helpers');
const ReportType = require('../models/report-type.model');
class ReportTypeController {
  static async getAllReportTypes(searchQueries) {
    const { page = PAGE, limit = LIMIT, status } = searchQueries;

    const queries = getSearchQueries([
      { fieldName: 'status', searchValue: status, mode: MODE_SEARCH.EXACT },
    ]);

    try {
      const reportTypes = await ReportType.find(queries)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return createResponse(
        'success',
        'Get all report types successfully',
        reportTypes,
        null,
        {
          total: reportTypes.length,
          currentPage: +page,
          totalPages: Math.ceil(reportTypes.length / limit),
        }
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get all report types',
        detail: error.message,
        source: 'controller/report-type/getAllReportTypes',
      });
    }
  }
  static async getReportTypeDetail(id) {
    try {
      const reportType = await ReportType.findById(id).exec();
      if (!reportType) {
        return createResponse('error', null, null, {
          status: 404,
          title: 'Report type not found',
          detail: 'Report type not found',
          source: 'controller/report-type/getReportTypeDetail',
        });
      }
      return createResponse(
        'success',
        'Get report type detail successfully',
        reportType,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get report type detail',
        detail: error.message,
        source: 'controller/report-type/getReportTypeDetail',
      });
    }
  }
  static async createReportType({ name, status }) {
    try {
      const reportType = await ReportType.create({
        name,
        status,
      });
      return createResponse(
        'success',
        'Create report type successfully',
        reportType,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create report type',
        detail: error.message,
        source: 'controller/report-type/createReportType',
      });
    }
  }

  static async deleteReportType(reportTypeId) {
    try {
      const reportType =
        await ReportType.findByIdAndDelete(reportTypeId).exec();
      return createResponse(
        'success',
        'Delete report type successfully',
        reportType._id,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when delete report type',
        detail: error.message,
        source: 'controller/report-type/deleteReportType',
      });
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
      return createResponse(
        'success',
        'Update report type successfully',
        reportType,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update report type',
        detail: error.message,
        source: 'controller/report-type/updateReportType',
      });
    }
  }
}

module.exports = ReportTypeController;
