const mongoose = require('mongoose');
const { REPORT_TYPE_STATUS } = require('../../constants');

const reportTypeSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: [...REPORT_TYPE_STATUS],
    default: 'active',
  },
});

module.exports = mongoose.model('ReportType', reportTypeSchema);
