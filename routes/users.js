const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getMyProfile
} = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.get('/users/:userId', getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2)
  })
}), updateAvatar);

module.exports = router;
