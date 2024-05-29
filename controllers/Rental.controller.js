const Rental = require('../models/Rental.model');

const getAllRentals = async (req, res) => {
    const renalties = await Rental.find({});
    res.status(200).json(renalties);
};

const createRental = async (req, res) => {
    try {
        const rental = await Rental.create(req.body);
        res.status(201).json(rental);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const deleteRental = async (req, res) => {
    try {
        await Rental.deleteOne({ RentalID: req.params.id });
        res.status(200).json({ message: 'Rental removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllRentals,
    createRental,
    deleteRental,
};
