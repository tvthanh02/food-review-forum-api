const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
