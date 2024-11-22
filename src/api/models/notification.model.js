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
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
