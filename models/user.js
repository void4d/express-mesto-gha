const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов']
  },
  avatar: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля "avatar" - 2 символа'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL'
    }
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля "about" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "about" - 30 символов']
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
