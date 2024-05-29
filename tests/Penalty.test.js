const {
    getAllPenalties,
    createPenalty,
    deletePenalty,
} = require('../controllers/Penalty.controller');
const Penalty = require('../models/Penalty.model');

jest.mock('../models/Penalty.model');

describe('Penalties Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllPenalties', () => {
        it('should return all penalties', async () => {
            const mockPenalties = [
                { PenaltyID: 1, PenaltyDescription: 'Late return fee' },
                { PenaltyID: 2, PenaltyDescription: 'Damage fee' },
            ];
            Penalty.find.mockResolvedValue(mockPenalties);

            await getAllPenalties(req, res);

            expect(Penalty.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPenalties);
        });
    });

    describe('createPenalty', () => {
        it('should create a new penalty and return it', async () => {
            req.body = {
                PenaltyID: 3,
                PenaltyDescription: 'Cancellation fee',
            };
            const mockPenalty = { ...req.body, save: jest.fn().mockResolvedValue({}) };
            Penalty.create.mockResolvedValue(mockPenalty);

            await createPenalty(req, res);

            expect(Penalty.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockPenalty);
        });
    });

    describe('deletePenalty', () => {
        it('should delete a penalty and return success message', async () => {
            req.params.id = '3';
            Penalty.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deletePenalty(req, res);

            expect(Penalty.deleteOne).toHaveBeenCalledWith({ PenaltyID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Penalty removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            Penalty.deleteOne.mockRejectedValue(error);

            await deletePenalty(req, res);

            expect(Penalty.deleteOne).toHaveBeenCalledWith({ PenaltyID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
