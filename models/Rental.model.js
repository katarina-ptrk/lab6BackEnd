const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    RentalID: { type: Number, required: true, unique: true },
    CustomerID: { type: Number, required: true, unique: true },
    CarID: { type: Number, required: true, unique: true },
    RentalDate: { type: String, required: true },
    ExpectedReturnDate: { type: String, required: true },
    ActualReturnDate: { type: String, required: true },
    PenaltyID: { type: Number, required: true, unique: true },
    PenaltyAmount: { type: Number, required: true, unique: true },
});

const Rentals = mongoose.model('Rentals', rentalSchema);

module.exports = Rentals;
