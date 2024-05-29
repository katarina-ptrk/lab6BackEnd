const express = require('express');
const {
    getAllCarTypes,
    createCarType,
    deleteCarType,
} = require('../controllers/CarTypes.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllCarTypes);
router.post('/', createCarType);
router.delete('/:id', logDeletion('CarType'), deleteCarType);

module.exports = router;
