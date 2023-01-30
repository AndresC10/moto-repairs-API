const { Router } = require('express');
const {
  getPendingRepairs,
  getPendingRepair,
  createPendingRepair,
  updatePendingRepair,
  deletePendingRepair,
} = require('../controllers/repairs.controller');
const { validIfExistRepair } = require('../middlewares/repairs.middleware');

const router = Router();

router.get('/', getPendingRepairs);

router.get('/:id', validIfExistRepair, getPendingRepair);

router.post('/', createPendingRepair);

router.patch('/:id', validIfExistRepair, updatePendingRepair);

router.put('/:id', validIfExistRepair, updatePendingRepair);

router.delete('/:id', validIfExistRepair, deletePendingRepair);

module.exports = {
  repairsRouter: router,
};
