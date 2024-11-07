const { PAGE, LIMIT } = require('../../constants');
const Report = require('../models/report.model');
class ReportController {
  static async getAllReports(queries) {
    const { page = PAGE, limit = LIMIT } = queries;
    try {
      const reports = await Report.find()
        .populate('user_id', 'user_name avatar')
        .populate('post_id')
        .populate('report_type_id', 'name')
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        data: {
          data: reports.map((report) => ({
            _id: report._id,
            note: report.note,
            post: report.post_id,
            user: report.user_id,
            report_content: report.report_type_id,
            created_at: report.created_at,
            updated_at: report.updated_at,
          })),
          meta: {
            total: reports.length,
            currentPage: +page,
            totalPages: Math.ceil(reports.length / limit),
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
  static async createReport(data) {
    const { post_id, report_type_id, uid } = data;
    try {
      const report = await Report.create({
        post_id,
        report_type_id,
        user_id: uid,
      });
      await report.save();
      return {
        data: report,
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
module.exports = ReportController;
