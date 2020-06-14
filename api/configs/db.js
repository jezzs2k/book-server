const mongoose = require('mongoose');
const { MONGOURL } = require('./default.json');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('connect db ....');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
