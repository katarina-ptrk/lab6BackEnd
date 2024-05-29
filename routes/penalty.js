const express = require('express');
const {
    getAllPenalties,
    createPenalty,
    deletePenalty,
} = require('../controllers/Penalty.controller');

const logDeletion = require('../middleware/logDeletion');

const router = express.Router();
router.get('/', getAllPenalties);
router.post('/', createPenalty);
router.delete('/:id', logDeletion('Penalty'), deletePenalty);

module.exports = router;
