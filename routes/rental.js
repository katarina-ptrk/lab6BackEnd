const express = require('express');
const { getAllRentals, createRental, deleteRental } = require('../controllers/Rental.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllRentals);
router.post('/', createRental);
router.delete('/:id', logDeletion('Rental'), deleteRental);

module.exports = router;
