const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  province: String,
});

module.exports = mongoose.model('Province', addressSchema);
