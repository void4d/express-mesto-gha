const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  avatar: {
    type: String,
    required: true,
    minlength: 2,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('user', userSchema);
