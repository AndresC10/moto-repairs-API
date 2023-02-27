const User = require('../models/users.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      status: 'available',
      id,
    },
  });
  if (!user) {
    return next(new AppError('The id does not correspond to any user', 400));
  }

  req.user = user;
  next();
});
