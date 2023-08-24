const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
  },
  owner: mongoose.Schema.Types.ObjectId,
  likes: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
