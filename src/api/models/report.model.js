const mongoose = require('mongoose');
const { REPORT_STATUS } = require('../../constants');

const reportSchema = new mongoose.Schema(
  {
    report_type_id: {
      type: [mongoose.Types.ObjectId],
      ref: 'ReportType',
      required: true,
    },
    note: String,
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: [...REPORT_STATUS],
      default: 'Pending',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Report', reportSchema);
