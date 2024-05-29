const express = require('express');
const {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
} = require('../controllers/Customers.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.delete('/:id', logDeletion('Customer'), deleteCustomer);

module.exports = router;
