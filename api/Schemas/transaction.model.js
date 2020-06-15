const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;
