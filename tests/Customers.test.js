const {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
} = require('../controllers/Customers.controller');
const Customers = require('../models/Customers.model');

jest.mock('../models/Customers.model');

describe('Customers Controller', () => {
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

    describe('getAllCustomers', () => {
        it('should return all customers', async () => {
            const mockCustomers = [
                {
                    CustomerID: 1,
                    LastName: 'Doe',
                    Name: 'John',
                    SecondName: 'Smith',
                    Birthday: '1990-01-01',
                    Phone: '123456789',
                    DiscountID: 1,
                },
                {
                    CustomerID: 2,
                    LastName: 'Smith',
                    Name: 'Jane',
                    SecondName: 'Doe',
                    Birthday: '1995-05-05',
                    Phone: '987654321',
                    DiscountID: 2,
                },
            ];
            Customers.find.mockResolvedValue(mockCustomers);

            await getAllCustomers(req, res);

            expect(Customers.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCustomers);
        });
    });

    describe('createCustomer', () => {
        it('should create a new customer and return it', async () => {
            req.body = {
                CustomerID: 3,
                LastName: 'Johnson',
                Name: 'Alice',
                SecondName: 'Doe',
                Birthday: '1988-08-08',
                Phone: '555555555',
                DiscountID: 3,
            };
            const mockCustomer = { ...req.body, save: jest.fn().mockResolvedValue({}) };
            Customers.create.mockResolvedValue(mockCustomer);

            await createCustomer(req, res);

            expect(Customers.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCustomer);
        });
    });

    describe('deleteCustomer', () => {
        it('should delete a customer and return success message', async () => {
            req.params.id = '3';
            Customers.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteCustomer(req, res);

            expect(Customers.deleteOne).toHaveBeenCalledWith({ CustomerID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Customer removed successfully' });
        });

        it('should handle errors during deletion', async () => {
            req.params.id = '3';
            const error = new Error('Deletion error');
            Customers.deleteOne.mockRejectedValue(error);

            await deleteCustomer(req, res);

            expect(Customers.deleteOne).toHaveBeenCalledWith({ CustomerID: req.params.id });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
