const Discount = require('../models/Discount.model');

const getAllDiscounts = async (req, res) => {
    const discounts = await Discount.find({});
    res.status(200).json(discounts);
};

const createDiscount = async (req, res) => {
    const discount = await Discount.create(req.body);
    res.status(201).json(discount);
};

const deleteDiscount = async (req, res) => {
    try {
        await Discount.deleteOne({ DiscountID: req.params.id });
        res.status(200).json({ message: 'Discount removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllDiscounts,
    createDiscount,
    deleteDiscount,
};
