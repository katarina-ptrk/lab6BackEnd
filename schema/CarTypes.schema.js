const graphql = require('graphql');
const CarTypes = require('../models/CarTypes.model');

const CarTypesType = new graphql.GraphQLObjectType({
    name: 'CarType',
    fields: () => ({
        CarTypeID: { type: graphql.GraphQLInt },
        Type: { type: graphql.GraphQLString },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addCarType: {
            type: CarTypesType,
            args: {
                CarTypeID: { type: graphql.GraphQLInt },
                Type: { type: graphql.GraphQLString },
            },
            resolve: async (parent, args) => CarTypes.create(args),
        },
        deleteCarType: {
            type: graphql.GraphQLString,
            args: {
                CarID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await CarTypes.remove(args.CarTypeID);
                return 'CarType deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllCarTypes: {
            type: new graphql.GraphQLList(CarTypesType),
            resolve: async () => CarTypes.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
