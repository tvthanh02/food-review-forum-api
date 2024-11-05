const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  icon: String,
});

module.exports = new mongoose.model('Reaction', reactionSchema);
