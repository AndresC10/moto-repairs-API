const Repair = require('../models/repairs.models');
const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.getPendingRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The repairs were found successfully',
    repairs,
  });
});

exports.getPendingRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  res.status(200).json({
    status: 'success',
    message: 'The repair was found successfully',
    repair,
  });
});

exports.createPendingRepair = catchAsync(async (req, res) => {
  const { date, motorsNumber, description, userId } = req.body;
  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId,
  });
  res.status(201).json({
    status: 'success',
    message: 'The repairs was created successfully',
    repair,
  });
});

exports.updatePendingRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'completed' });
  res.status(200).json({
    status: 'success',
    message: 'Then repair has been updated successfully',
  });
});

exports.deletePendingRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
    message: 'The product has been deleted successfully',
  });
});
