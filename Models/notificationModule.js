const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    notificationData: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model('NotificationModel', notificationSchema);