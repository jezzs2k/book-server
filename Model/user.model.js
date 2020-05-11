const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    default: "https://picsum.photos/100"
  },
  carts: {
    type: Object,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: false
  },
})

const User = mongoose.model('user', UserSchema);
module.exports = User;