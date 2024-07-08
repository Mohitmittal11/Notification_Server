const mongoose = require("mongoose");

const userinfoModel = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    isleaveApproved: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userinfomodel", userinfoModel);
