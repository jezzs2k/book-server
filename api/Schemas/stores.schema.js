const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    rate: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model('store', StoreSchema);
module.exports = Store;
