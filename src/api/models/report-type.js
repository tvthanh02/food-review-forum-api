const mongoose = require('mongoose');

const reportTypeSchema = new mongoose.Schema({
  name: String,
});

module.exports = new mongoose.model('ReportType', reportTypeSchema);
