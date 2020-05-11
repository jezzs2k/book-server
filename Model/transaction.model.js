const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  des: {
    type: Schema.Types.ObjectId
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;
