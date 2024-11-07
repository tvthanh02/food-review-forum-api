const mongoose = require('mongoose');

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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Report', reportSchema);
