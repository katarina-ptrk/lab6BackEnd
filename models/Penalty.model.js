const mongoose = require('mongoose');

const penaltySchema = new mongoose.Schema({
    PenaltyID: { type: Number, required: true, unique: true },
    PenaltyDescription: { type: String, required: true },
});

const Penalty = mongoose.model('Penalty', penaltySchema);

module.exports = Penalty;
