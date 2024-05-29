const mongoose = require('mongoose');

const deletedDocumentSchema = new mongoose.Schema({
    modelName: { type: String, required: true },
    deletedId: { type: String, required: true },
    deletedAt: { type: Date, default: Date.now },
});

const DeletedDocument = mongoose.model('DeletedDocument', deletedDocumentSchema);

module.exports = DeletedDocument;
