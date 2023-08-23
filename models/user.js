const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  avatar: {
    type: String,
  },
  about: {
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
