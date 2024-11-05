const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  icon: String,
});

module.exports = mongoose.model('Reaction', reactionSchema);
