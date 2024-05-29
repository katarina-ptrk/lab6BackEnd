const {
    getAllDiscounts,
    createDiscount,
    deleteDiscount,
} = require('../controllers/Discount.controller');
const Discount = require('../models/Discount.model');

jest.mock('../models/Discount.model');

describe('Discounts Controller', () => {
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

    describe('getAllDiscounts', () => {
        it('should return all discounts', async () => {
            const mockDiscounts = [
                { DiscountID: 1, DiscountDescription: '10% off', DiscountPercentage: 10 },
                { DiscountID: 2, DiscountDescription: '20% off', DiscountPercentage: 20 },
            ];
            Discount.find.mockResolvedValue(mockDiscounts);

            await getAllDiscounts(req, res);

            expect(Discount.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockDiscounts);
        });
    });

    describe('createDiscount', () => {
        it('should create a new discount and return it', async () => {
            req.body = {
                DiscountID: 3,
                DiscountDescription: '15% off',
                DiscountPercentage: 15,
            };
            const mockDiscount = { ...req.body, save: jest.fn().mockResolvedValue({}) };
            Discount.create.mockResolvedValue(mockDiscount);

            await createDiscount(req, res);

            expect(Discount.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockDiscount);
        });
    });

    describe('deleteDiscount', () => {
        it('should delete a discount and return success message', async () => {
            req.params.id = '3';
            Discount.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteDiscount(req, res);

            expect(Discount.deleteOne).toHaveBeenCalledWith({ DiscountID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Discount removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            Discount.deleteOne.mockRejectedValue(error);

            await deleteDiscount(req, res);

            expect(Discount.deleteOne).toHaveBeenCalledWith({ DiscountID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
