const mongoose = require('mongoose');
const { REPORT_TYPE_STATUS } = require('../../constants');

const reportTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [...REPORT_TYPE_STATUS],
    required: true,
  },
});

module.exports = mongoose.model('ReportType', reportTypeSchema);
