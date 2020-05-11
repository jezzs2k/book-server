const mongoose = require("mongoose");
const { MONGOURL } = require("./default.json");

const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGOURL,
      { useNewUrlParser: true },
      { useFindAndModify: true },
      { useCreateIndex: true }
    );

    console.log("connect db ....");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
