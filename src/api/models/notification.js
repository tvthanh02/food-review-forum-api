const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    content: String,
    status: {
      type: String,
      enum: ['notify', 'warn'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
