const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
    default: 'Жак-Ив-Кусто'
  },
  avatar: {
    type: String,
    minlength: [2, 'Минимальная длина поля "avatar" - 2 символа'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL'
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "about" - 30 символов'],
    default: 'Исследователь океана'
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "email" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "email" - 30 символов'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный URL'
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "password" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "password" - 30 символов']
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
