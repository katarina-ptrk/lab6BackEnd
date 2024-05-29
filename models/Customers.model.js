const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    CustomerID: { type: Number, required: true, unique: true },
    LastName: { type: String, required: true },
    Name: { type: String, required: true },
    SecondName: { type: String, required: true },
    Birthday: { type: String, required: true },
    Phone: { type: String, required: true },
    DiscountID: { type: Number, required: true, unique: true },
});

const Customers = mongoose.model('Customers', customersSchema);

module.exports = Customers;
