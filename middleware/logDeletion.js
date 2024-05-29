const DeletedDocument = require('../models/DeletedDocument.model');

const logDeletedDocument = modelName => async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedDocument = await DeletedDocument.create({
            modelName,
            deletedId: id,
            deletedAt: Date.now(),
        });
        console.log(
            `Deleted document ${modelName} with ID ${id} at ${new Date(deletedDocument.deletedAt)}`,
        );
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = logDeletedDocument;
