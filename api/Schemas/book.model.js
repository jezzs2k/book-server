const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String
  },
  des: {
    type: String
  },
  img: {
    type: String
  }
});

const Book = mongoose.model("book", BookSchema);
module.exports = Book;
