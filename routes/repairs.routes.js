const { Router } = require('express');
const { check } = require('express-validator');
const {
  getPendingRepairs,
  getPendingRepair,
  createPendingRepair,
  updatePendingRepair,
  deletePendingRepair,
} = require('../controllers/repairs.controller');
const { validIfExistRepair } = require('../middlewares/repairs.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', getPendingRepairs);

router.get('/:id', validIfExistRepair, getPendingRepair);

router.post(
  '/',
  [
    check('date', 'The date must be provided').not().isEmpty(),
    check('date', 'The date must be in the correct format').isDate(),
    check('motorsNumber', 'The motorsNumber must be provided').not().isEmpty(),
    check(
      'motorsNumber',
      'The motorsNumber must be in the correct format'
    ).isInt(),
    check('description', 'The description must be provided').not().isEmpty(),
    check('userId', 'The userId must be provided').not().isEmpty(),
    check('userId', 'The userId must be in the correct format').isInt(),
    validateFields,
  ],
  createPendingRepair
);

router.patch('/:id', validIfExistRepair, updatePendingRepair);

router.put('/:id', validIfExistRepair, updatePendingRepair);

router.delete('/:id', validIfExistRepair, deletePendingRepair);

module.exports = {
  repairsRouter: router,
};
