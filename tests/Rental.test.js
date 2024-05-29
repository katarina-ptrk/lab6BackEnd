const { getAllRentals, createRental, deleteRental } = require('../controllers/Rental.controller');
const Rentals = require('../models/Rental.model');

jest.mock('../models/Rental.model');

describe('Rentals Controller', () => {
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

    describe('getAllRentals', () => {
        it('should return all rentals', async () => {
            const mockRentals = [
                {
                    RentalID: 1,
                    CustomerID: 1,
                    CarID: 1,
                    RentalDate: '2024-01-01',
                    ExpectedReturnDate: '2024-01-05',
                    ActualReturnDate: '2024-01-06',
                    PenaltyID: 1,
                    PenaltyAmount: 50,
                },
                {
                    RentalID: 2,
                    CustomerID: 2,
                    CarID: 2,
                    RentalDate: '2024-02-01',
                    ExpectedReturnDate: '2024-02-05',
                    ActualReturnDate: '2024-02-06',
                    PenaltyID: 2,
                    PenaltyAmount: 100,
                },
            ];
            Rentals.find.mockResolvedValue(mockRentals);

            await getAllRentals(req, res);

            expect(Rentals.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRentals);
        });
    });

    describe('createRental', () => {
        it('should create a new rental and return it', async () => {
            req.body = {
                RentalID: 3,
                CustomerID: 3,
                CarID: 3,
                RentalDate: '2024-03-01',
                ExpectedReturnDate: '2024-03-05',
                ActualReturnDate: '2024-03-06',
                PenaltyID: 3,
                PenaltyAmount: 150,
            };
            const mockRental = { ...req.body, save: jest.fn().mockResolvedValue({}) };
            Rentals.create.mockResolvedValue(mockRental);

            await createRental(req, res);

            expect(Rentals.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockRental);
        });
    });

    describe('deleteRental', () => {
        it('should delete a rental and return success message', async () => {
            req.params.id = '3';
            Rentals.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteRental(req, res);

            expect(Rentals.deleteOne).toHaveBeenCalledWith({ RentalID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Rental removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            Rentals.deleteOne.mockRejectedValue(error);

            await deleteRental(req, res);

            expect(Rentals.deleteOne).toHaveBeenCalledWith({ RentalID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
