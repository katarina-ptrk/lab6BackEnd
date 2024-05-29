const express = require('express');
const { getAllCars, createCar, deleteCar } = require('../controllers/Cars.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllCars);
router.post('/', createCar);
router.delete('/:id', logDeletion('Car'), deleteCar);

module.exports = router;
