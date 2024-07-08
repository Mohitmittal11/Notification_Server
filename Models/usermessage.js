const mongoose = require("mongoose");

const UserMessageModels = new mongoose.Schema(
  {
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usermessagemodule", UserMessageModels);
