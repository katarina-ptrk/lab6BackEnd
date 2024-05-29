const { getAllCars, createCar, deleteCar } = require('../controllers/Cars.controller');
const Cars = require('../models/Cars.model');

jest.mock('../models/Cars.model');

describe('Cars Controller', () => {
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

    describe('getAllCars', () => {
        it('should return all cars', async () => {
            const mockCars = [
                {
                    CarID: 1,
                    BrandID: '1',
                    Model: 'Model S',
                    CarTypeID: 1,
                    CarYear: 2020,
                    Price: 80000,
                    RentalRate: 500,
                },
                {
                    CarID: 2,
                    BrandID: '2',
                    Model: 'Model 3',
                    CarTypeID: 2,
                    CarYear: 2021,
                    Price: 35000,
                    RentalRate: 300,
                },
            ];
            Cars.find.mockResolvedValue(mockCars);

            await getAllCars(req, res);

            expect(Cars.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCars);
        });
    });

    describe('createCar', () => {
        it('should create a new car and return it', async () => {
            req.body = {
                CarID: 3,
                BrandID: '3',
                Model: 'Model X',
                CarTypeID: 3,
                CarYear: 2019,
                Price: 90000,
                RentalRate: 600,
            };
            const mockCar = { ...req.body, save: jest.fn().mockResolvedValue({}) };
            Cars.create.mockResolvedValue(mockCar);

            await createCar(req, res);

            expect(Cars.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCar);
        });

        it('should return 500 if an error occurs', async () => {
            req.body = {
                CarID: 3,
                BrandID: '3',
                Model: 'Model X',
                CarTypeID: 3,
                CarYear: 2019,
                Price: 90000,
                RentalRate: 600,
            };
            const error = new Error('Some error');
            Cars.create.mockRejectedValue(error);

            await createCar(req, res);

            expect(Cars.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });

    describe('deleteCar', () => {
        it('should delete a car and return success message', async () => {
            req.params.id = '3';
            Cars.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteCar(req, res);

            expect(Cars.deleteOne).toHaveBeenCalledWith({ CarID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Car removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            Cars.deleteOne.mockRejectedValue(error);

            await deleteCar(req, res);

            expect(Cars.deleteOne).toHaveBeenCalledWith({ CarID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
