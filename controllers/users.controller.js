const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'Users were found successfully',
    users,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role = 'client' } = req.body;
  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;
  await user.update({ name, email });
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'unavailable' });
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
