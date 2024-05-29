const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    CarID: { type: Number, required: true, unique: true },
    BrandID: { type: String, required: true },
    Model: { type: String, required: true },
    CarTypeID: { type: Number, required: true, unique: true },
    CarYear: { type: Number, required: true, unique: true },
    Price: { type: Number, required: true, unique: true },
    RentalRate: { type: Number, required: true, unique: true },
});

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;
