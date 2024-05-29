const express = require('express');
const {
    getAllCarBrands,
    createCarBrand,
    deleteCarBrand,
} = require('../controllers/CarBrand.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllCarBrands);
router.post('/', createCarBrand);
router.delete('/:id', logDeletion('CarBrand'), deleteCarBrand);

module.exports = router;
