const Customers = require('../models/Customers.model');

const getAllCustomers = async (req, res) => {
    const customers = await Customers.find({});
    res.status(200).json(customers);
};

const createCustomer = async (req, res) => {
    try {
        const customer = await Customers.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        await Customers.deleteOne({ CustomerID: req.params.id });
        res.status(200).json({ message: 'Customer removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
};
