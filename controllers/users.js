const userSchema = require('../models/user');

function getUsers(req, res) {
  return userSchema
    .find()
    .then((r) => res.status(200).send(r))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function getUserById(req, res) {
  const { userId } = req.params;

  return userSchema
    .findById(userId)
    .orFail(new Error('Неверный id'))
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((err) => {
      if (err.message === 'Неверный id') {
        return res.status(404).send({ message: 'Пользователь с таким id не найден' });
      }

      if (err.message === 'ValidationError') {
        return res.status(400).send({ message: 'Неверный id' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return userSchema
    .create({ name, about, avatar })
    .then((r) => res.status(201).send(r))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;

  return userSchema
    .findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: 'true' })
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  return userSchema
    .findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: 'true' })
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
