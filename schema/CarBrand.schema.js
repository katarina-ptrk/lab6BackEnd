const graphql = require('graphql');
const CarBrand = require('../models/CarBrand.model');

const CarBrandType = new graphql.GraphQLObjectType({
    name: 'CarBrand',
    fields: () => ({
        BrandID: { type: graphql.GraphQLInt },
        Brand: { type: graphql.GraphQLString },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addCar: {
            type: CarBrandType,
            args: {
                BrandID: { type: graphql.GraphQLInt },
                Brand: { type: graphql.GraphQLString },
            },
            resolve: async (parent, args) => CarBrand.create(args),
        },
        deleteCarBrand: {
            type: graphql.GraphQLString,
            args: {
                BrandID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await CarBrand.remove(args.BrandID);
                return 'Brand deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllBrands: {
            type: new graphql.GraphQLList(CarBrandType),
            resolve: async () => CarBrand.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
