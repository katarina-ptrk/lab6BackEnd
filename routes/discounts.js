const express = require('express');
const {
    getAllDiscounts,
    createDiscount,
    deleteDiscount,
} = require('../controllers/Discount.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllDiscounts);
router.post('/', createDiscount);
router.delete('/:id', logDeletion('Discount'), deleteDiscount);

module.exports = router;
