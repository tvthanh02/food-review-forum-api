const mongoose = require('mongoose');
const { REPORT_STATUS } = require('../../constants');

const reportSchema = new mongoose.Schema(
  {
    report_type_id: {
      type: [mongoose.Types.ObjectId],
      ref: 'ReportType',
    },
    note: String,
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: [...REPORT_STATUS],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Report', reportSchema);
