const mongoose = require('mongoose');

const carBrandSchema = new mongoose.Schema({
    BrandID: { type: Number, required: true, unique: true },
    Brand: { type: String, required: true },
});

const CarBrand = mongoose.model('CarBrand', carBrandSchema);

module.exports = CarBrand;
