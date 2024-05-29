const {
    getAllCarBrands,
    createCarBrand,
    deleteCarBrand,
} = require('../controllers/CarBrand.controller');
const CarBrand = require('../models/CarBrand.model');

jest.mock('../models/CarBrand.model');

describe('CarBrand Controller', () => {
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

    describe('getAllCarBrands', () => {
        it('should return all car brands', async () => {
            const mockBrands = [
                { BrandID: '1', Brand: 'Toyota' },
                { BrandID: '2', Brand: 'Honda' },
            ];
            CarBrand.find.mockResolvedValue(mockBrands);

            await getAllCarBrands(req, res);

            expect(CarBrand.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBrands);
        });
    });

    describe('createCarBrand', () => {
        it('should create a new car brand and return it', async () => {
            req.body = { BrandID: '3', Brand: 'Ford' };
            const mockCarBrand = {
                BrandID: '3',
                Brand: 'Ford',
                save: jest.fn().mockResolvedValue({}),
            };
            CarBrand.create.mockResolvedValue(mockCarBrand);

            await createCarBrand(req, res);

            expect(CarBrand.create).toHaveBeenCalledWith({ BrandID: '3', Brand: 'Ford' });
            expect(mockCarBrand.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockCarBrand);
        });

        it('should return 400 if car brand with the same id already exists', async () => {
            req.body = { BrandID: '3', Brand: 'Ford' };
            const error = { code: 11000 };
            CarBrand.create.mockRejectedValue(error);

            await createCarBrand(req, res);

            expect(CarBrand.create).toHaveBeenCalledWith({ BrandID: '3', Brand: 'Ford' });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('CarBrand with this id already exists.');
        });
    });

    describe('deleteCarBrand', () => {
        it('should delete a car brand and return success message', async () => {
            req.params.id = '3';
            CarBrand.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteCarBrand(req, res);

            expect(CarBrand.deleteOne).toHaveBeenCalledWith({ BrandID: '3' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'CarBrand removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            CarBrand.deleteOne.mockRejectedValue(error);

            await deleteCarBrand(req, res);

            expect(CarBrand.deleteOne).toHaveBeenCalledWith({ BrandID: '3' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
