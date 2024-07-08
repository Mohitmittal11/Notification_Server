const mongoose = require("mongoose");
require("dotenv").config();

const connectedDatabase = mongoose
  .connect(`${process.env.MongoDBURL}`)
  .then(() => console.log("Database is Connected"))
  .catch((err) => {
    console.log(err);
  });

module.exports = connectedDatabase;
