const Repair = require('../models/repairs.models');
const User = require('../models/users.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
      },
    ],
  });
  if (!repair) {
    return next(new AppError('Repair not found', 404));
  }
  console.log(repair);
  req.repair = repair;
  next();
});
