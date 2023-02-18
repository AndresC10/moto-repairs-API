const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', getUsers);

router.get('/:id', validIfExistUser, getUser);

router.post(
  '/',
  [
    check('name', 'The name must be provided').not().isEmpty(),
    check('email', 'The email must be provided').not().isEmpty(),
    check('email', 'The email must be in the correct format').isEmail(),
    check('password', 'The password must be provided').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.patch('/:id', validIfExistUser, updateUser);

router.put('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
