const Penalty = require('../models/Penalty.model');

const getAllPenalties = async (req, res) => {
    const penalty = await Penalty.find({});
    res.status(200).json(penalty);
};

const createPenalty = async (req, res) => {
    const penalty = await Penalty.create(req.body);
    res.status(201).json(penalty);
};

const deletePenalty = async (req, res) => {
    try {
        await Penalty.deleteOne({ PenaltyID: req.params.id });
        res.status(200).json({ message: 'Penalty removed successfully' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllPenalties,
    createPenalty,
    deletePenalty,
};
