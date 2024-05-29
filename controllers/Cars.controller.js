const Cars = require('../models/Cars.model');

const getAllCars = async (req, res) => {
    const cars = await Cars.find({});
    res.status(200).json(cars);
};

const createCar = async (req, res) => {
    try {
        const car = await Cars.create(req.body);
        res.status(201).json(car);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        await Cars.deleteOne({ CarID: req.params.id });
        res.status(200).json({ message: 'Car removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllCars,
    createCar,
    deleteCar,
};
