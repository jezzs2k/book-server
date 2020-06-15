const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  sessionId: {
    type:  String,
    require: true
  },
  carts: {
    type: Object,
    default: {}
  },
})

const Session = mongoose.model('session', SessionSchema);
module.exports = Session;