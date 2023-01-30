const { Router } = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const { validIfExistUser } = require('../middlewares/user.middleware');

const router = Router();

router.get('/', getUsers);

router.get('/:id', validIfExistUser, getUser);

router.post('/', createUser);

router.patch('/:id', validIfExistUser, updateUser);

router.put('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
