const graphql = require('graphql');
const Rental = require('../models/Rental.model');

const RentalType = new graphql.GraphQLObjectType({
    name: 'Rental',
    fields: () => ({
        RentalID: { type: graphql.GraphQLInt },
        CustomerID: { type: graphql.GraphQLInt },
        CarID: { type: graphql.GraphQLInt },
        RentalDate: { type: graphql.GraphQLString },
        ExpectedReturnDate: { type: graphql.GraphQLString },
        ActualReturnDate: { type: graphql.GraphQLString },
        PenaltyID: { type: graphql.GraphQLInt },
        PenaltyAmount: { type: graphql.GraphQLInt },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addRental: {
            type: RentalType,
            args: {
                RentalID: { type: graphql.GraphQLInt },
                CustomerID: { type: graphql.GraphQLInt },
                CarID: { type: graphql.GraphQLInt },
                RentalDate: { type: graphql.GraphQLString },
                ExpectedReturnDate: { type: graphql.GraphQLString },
                ActualReturnDate: { type: graphql.GraphQLString },
                PenaltyID: { type: graphql.GraphQLInt },
                PenaltyAmount: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => Rental.create(args),
        },
        deleteRental: {
            type: graphql.GraphQLString,
            args: {
                RentalID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await Rental.remove(args.RentalID);
                return 'Rental deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllRentals: {
            type: new graphql.GraphQLList(RentalType),
            resolve: async () => Rental.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
