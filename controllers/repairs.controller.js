const Repair = require('../models/repairs.models');

exports.getPendingRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'The repairs were found successfully',
      repairs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.getPendingRepair = async (req, res) => {
  try {
    const { repair } = req;
    res.status(200).json({
      status: 'success',
      message: 'The repair was found successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.createPendingRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const repair = await Repair.create({
      date,
      userId,
    });
    res.status(201).json({
      status: 'success',
      message: 'The repairs was created successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updatePendingRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'completed' });
    res.status(200).json({
      status: 'success',
      message: 'Then repair has been updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deletePendingRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'cancelled' });
    res.status(200).json({
      status: 'success',
      message: 'The product has been deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
