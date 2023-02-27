const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
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

router.post(
  '/login',
  [
    check('email', 'The email must be provided').not().isEmpty(),
    check('email', 'The email must be in the correct format').isEmail(),
    check('password', 'The password must be provided').not().isEmpty(),
    validateFields,
  ],
  login
);

router.use(protect);

router.patch('/:id', validIfExistUser, protectAccountOwner, updateUser);

router.put('/:id', validIfExistUser, protectAccountOwner, updateUser);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
