const mongoose = require('mongoose');

const reportTypeSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('ReportType', reportTypeSchema);
