const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    DiscountID: { type: Number, required: true, unique: true },
    DiscountDescription: { type: String, required: true },
    DiscountPercentage: { type: Number, required: true, unique: true },
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
