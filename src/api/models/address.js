const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  province: String,
});

module.exports = new mongoose.model('Province', addressSchema);
