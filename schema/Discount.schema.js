const graphql = require('graphql');
const Discount = require('../models/Discount.model');

const DiscountType = new graphql.GraphQLObjectType({
    name: 'Discount',
    fields: () => ({
        DiscountID: { type: graphql.GraphQLInt },
        DiscountDescription: { type: graphql.GraphQLString },
        DiscountPercentage: { type: graphql.GraphQLFloat },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addDiscount: {
            type: DiscountType,
            args: {
                DiscountID: { type: graphql.GraphQLInt },
                DiscountDescription: { type: graphql.GraphQLString },
                DiscountPercentage: { type: graphql.GraphQLFloat },
            },
            resolve: async (parent, args) => Discount.create(args),
        },
        deleteDiscount: {
            type: graphql.GraphQLString,
            args: {
                DiscountID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await Discount.remove(args.DiscountID);
                return 'Discount deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllDiscounts: {
            type: new graphql.GraphQLList(DiscountType),
            resolve: async () => Discount.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
