const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  link: String,
  owner: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('card', cardSchema);
