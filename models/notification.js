const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    to: {
      type: String,
    },
    notification: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = notification = mongoose.model("notifications",NotificationSchema);
