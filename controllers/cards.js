const cardSchema = require('../models/card');

function getCards(req, res) {
  return cardSchema
    .find({})
    .then((r) => res.status(200).send(r))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function createCard(req, res) {
  const owner = req.user._id;
  const { name, link } = req.body;
  return cardSchema
    .create({ name, link, owner })
    .then((r) => res.status(201).send(r))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

function deleteCard(req, res) {
  return cardSchema
    .findByIdAndDelete(req.params.cardId)
    .then((r) => res.status(200).send(r))
    .catch(() => res.status(404).send({ message: 'Ошибка 404: Карточка не найдена' }));
}

function putLike(req, res) {
  return cardSchema
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((r) => res.status(200).send(r))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function deleteLike(req, res) {
  return cardSchema
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((r) => res.status(200).send(r))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
