const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  sessionId: {
    type:  Schema.Types.ObjectId,
    require: true
  },
  carts: {
    type: Array,
    default: []
  },
})

const Session = mongoose.model('session', SessionSchema);
module.exports = Session;