const mongoose = require('mongoose');
const { number } = require('@hapi/joi');

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    des: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: null,
    },
    amount: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('book', BookSchema);
module.exports = Book;
