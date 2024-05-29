const graphql = require('graphql');
const Customers = require('../models/Customers.model');

const CustomersType = new graphql.GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        CustomerID: { type: graphql.GraphQLInt },
        LastName: { type: graphql.GraphQLString },
        Name: { type: graphql.GraphQLString },
        SecondName: { type: graphql.GraphQLString },
        Birthday: { type: graphql.GraphQLString },
        Phone: { type: graphql.GraphQLString },
        DiscountID: { type: graphql.GraphQLInt },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addCustomer: {
            type: CustomersType,
            args: {
                CustomerID: { type: graphql.GraphQLInt },
                LastName: { type: graphql.GraphQLString },
                Name: { type: graphql.GraphQLString },
                SecondName: { type: graphql.GraphQLString },
                Birthday: { type: graphql.GraphQLString },
                Phone: { type: graphql.GraphQLString },
                DiscountID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => Customers.create(args),
        },
        deleteCustomer: {
            type: graphql.GraphQLString,
            args: {
                CustomerID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await Customers.remove(args.CustomerID);
                return 'Customer deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllCustomer: {
            type: new graphql.GraphQLList(CustomersType),
            resolve: async () => Customers.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
