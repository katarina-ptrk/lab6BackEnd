const CarBrand = require('../models/CarBrand.model');

const getAllCarBrands = async (req, res) => {
    const brands = await CarBrand.find({});
    res.status(200).json(brands);
};

const createCarBrand = async (req, res) => {
    const { BrandID, Brand } = req.body;

    try {
        const carBrand = await CarBrand.create({ BrandID, Brand });
        await carBrand.save();
        return res.status(201).send(carBrand);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('CarBrand with this id already exists.');
        }
        return res.status(400);
    }
};

const deleteCarBrand = async (req, res) => {
    try {
        await CarBrand.deleteOne({ BrandID: req.params.id });
        res.status(200).json({ message: 'CarBrand removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = { getAllCarBrands, createCarBrand, deleteCarBrand };
