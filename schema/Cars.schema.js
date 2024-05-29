const graphql = require('graphql');
const Cars = require('../models/Cars.model');

const CarType = new graphql.GraphQLObjectType({
    name: 'Car',
    fields: () => ({
        CarID: { type: graphql.GraphQLInt },
        BrandID: { type: graphql.GraphQLInt },
        Model: { type: graphql.GraphQLString },
        CarTypeID: { type: graphql.GraphQLInt },
        CarYear: { type: graphql.GraphQLInt },
        Price: { type: graphql.GraphQLInt },
        RentalRate: { type: graphql.GraphQLInt },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addCar: {
            type: CarType,
            args: {
                CarID: { type: graphql.GraphQLInt },
                BrandID: { type: graphql.GraphQLInt },
                Model: { type: graphql.GraphQLString },
                CarTypeID: { type: graphql.GraphQLInt },
                CarYear: { type: graphql.GraphQLInt },
                Price: { type: graphql.GraphQLInt },
                RentalRate: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => Cars.create(args),
        },
        deleteCar: {
            type: graphql.GraphQLString,
            args: {
                CarID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await Cars.remove(args.CarID);
                return 'Car deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllCars: {
            type: new graphql.GraphQLList(CarType),
            resolve: async () => Cars.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
