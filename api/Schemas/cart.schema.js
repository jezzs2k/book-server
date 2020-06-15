const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
    },
    amount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('cart', StoreSchema);
module.exports = Cart;
