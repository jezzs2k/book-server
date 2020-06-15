const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    bookId: {
      type: Schema.Types.ObjectId,
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
