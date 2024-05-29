const CarTypes = require('../models/CarTypes.model');

const getAllCarTypes = async (req, res) => {
    const carTypes = await CarTypes.find({});
    res.status(200).json(carTypes);
};

const createCarType = async (req, res) => {
    const carType = await CarTypes.create(req.body);
    res.status(201).json(carType);
};

const deleteCarType = async (req, res) => {
    try {
        await CarTypes.deleteOne({ CarTypeID: req.params.id });
        res.status(200).json({ message: 'CarType removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllCarTypes,
    createCarType,
    deleteCarType,
};
