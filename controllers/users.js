const userSchema = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10
const JWT_SECRET = 'secretstring'

function getUsers(req, res) {
  return userSchema
    .find()
    .then((r) => res.status(200).send(r))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }))
}

function getUserById(req, res) {
  const { userId } = req.params

  return userSchema
    .findById(userId)
    .then((r) => {
      if (!r) {
        res.status(404).send({ message: 'Пользователь с таким id не найден' })
      }
      res.status(200).send(r)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный id' })
      }
      return res.status(500).send({ message: 'Ошибка сервера' })
    })
}

function getMyProfile(req, res) {
  const id = req.user.id

  return userSchema
    .findById(id)
    .then((r) => {
      if (!r) {
        res.status(404).send({ message: 'Пользователь не найден' })
      }
      res.status(200).send(r)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный id' })
      }
      return res.status(500).send({ message: 'Ошибка сервера' })
    })
}

function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body

  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    return userSchema.findOne({ email }).then((r) => {
      if (r) {
        return res.status(409).send({ message: 'Email уже используется' })
      }

      return userSchema
        .create({ name, about, avatar, email, password: hash })
        .then((r) => res.status(201).send(r))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Неверные данные' })
          }

          return res.status(500).send({ message: 'Ошибка сервера' })
        })
    })
  })
}

function updateUser(req, res) {
  const { name, about } = req.body

  return userSchema
    .findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: 'true' })
    .then((r) => res.status(200).send(r))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' })
      }
      return res.status(500).send({ message: 'Ошибка сервера' })
    })
}

function updateAvatar(req, res) {
  const { avatar } = req.body

  return userSchema
    .findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: 'true' })
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' })
      }
      return res.status(500).send({ message: 'Ошибка сервера' })
    })
}

function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ message: 'Почта или пароль не могут быть пустыми' })
  }

  return userSchema
    .findOne({ email })
    .select('+password')
    .then((r) => {
      if (!r) {
        return res.status(404).send({ message: 'Такого пользователя не существует' })
      }

      bcrypt.compare(password, r.password, (error, isValid) => {
        if (!isValid) {
          return res.status(401).send({ message: 'Неверный пароль или почта' })
        }

        const token = jwt.sign({ id: r.id }, JWT_SECRET, { expiresIn: '7d' })

        return res.status(200).send({ token })
      })
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }))
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMyProfile,
}
