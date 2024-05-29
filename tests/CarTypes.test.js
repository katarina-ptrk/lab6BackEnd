const {
    getAllCarTypes,
    createCarType,
    deleteCarType,
} = require('../controllers/CarTypes.controller');
const CarTypes = require('../models/CarTypes.model');

jest.mock('../models/CarTypes.model');

describe('CarTypes Controller', () => {
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

    describe('getAllCarTypes', () => {
        it('should return all car types', async () => {
            const mockCarTypes = [
                { CarTypeID: 1, Type: 'SUV' },
                { CarTypeID: 2, Type: 'Sedan' },
            ];
            CarTypes.find.mockResolvedValue(mockCarTypes);

            await getAllCarTypes(req, res);

            expect(CarTypes.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCarTypes);
        });
    });

    describe('createCarType', () => {
        it('should create a new car type and return it', async () => {
            req.body = { CarTypeID: 3, Type: 'Truck' };
            const mockCarType = { ...req.body, save: jest.fn().mockResolvedValue({}) };
            CarTypes.create.mockResolvedValue(mockCarType);

            await createCarType(req, res);

            expect(CarTypes.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCarType);
        });
    });

    describe('deleteCarType', () => {
        it('should delete a car type and return success message', async () => {
            req.params.id = '3';
            CarTypes.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteCarType(req, res);

            expect(CarTypes.deleteOne).toHaveBeenCalledWith({ CarTypeID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'CarType removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            CarTypes.deleteOne.mockRejectedValue(error);

            await deleteCarType(req, res);

            expect(CarTypes.deleteOne).toHaveBeenCalledWith({ CarTypeID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
