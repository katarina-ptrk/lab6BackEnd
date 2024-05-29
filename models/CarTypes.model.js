const mongoose = require('mongoose');

const carTypesSchema = new mongoose.Schema({
    CarTypeID: { type: Number, required: true, unique: true },
    Type: { type: String, required: true },
});

const CarTypes = mongoose.model('CarTypes', carTypesSchema);

module.exports = CarTypes;
