const { PAGE, LIMIT, MODE_SEARCH } = require('../../constants');
const { getSearchQueries, createResponse } = require('../helpers');
const Report = require('../models/report.model');
class ReportController {
  static async getAllReports(searchQueries) {
    const { page = PAGE, limit = LIMIT, status } = searchQueries;

    const queries = getSearchQueries([
      { fieldName: 'status', searchValue: status, mode: MODE_SEARCH.EXACT },
    ]);
    try {
      const reports = await Report.find(queries)
        .populate('user_id', 'user_name avatar')
        .populate('post_id')
        .populate('report_type_id', 'name')
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return createResponse(
        'success',
        'Get all reports successfully',
        reports,
        null,
        {
          total: reports?.length ?? 0,
          currentPage: +page,
          totalPages: Math.ceil(reports?.length / limit) ?? 0,
        }
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when get all reports',
        detail: error.message,
        source: 'controller/report/getAllReports',
      });
    }
  }
  static async createReport(data) {
    const { post_id, report_type_id, uid } = data;
    try {
      const report = await Report.create({
        post_id,
        report_type_id,
        user_id: uid,
      });
      return createResponse(
        'success',
        'Create report successfully',
        report,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when create report',
        detail: error.message,
        source: 'controller/report/createReport',
      });
    }
  }

  static async updateReportStatus(reportId, status) {
    try {
      const report = await Report.findByIdAndUpdate(reportId, { status });
      return createResponse(
        'success',
        'Update report status successfully',
        report,
        null
      );
    } catch (error) {
      return createResponse('error', null, null, {
        status: 500,
        title: 'Have error when update report status',
        detail: error.message,
        source: 'controller/report/updateReportStatus',
      });
    }
  }
}
module.exports = ReportController;
