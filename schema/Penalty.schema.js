const graphql = require('graphql');
const Penalty = require('../models/Penalty.model');

const PenaltyType = new graphql.GraphQLObjectType({
    name: 'Penalty',
    fields: () => ({
        PenaltyID: { type: graphql.GraphQLInt },
        PenaltyDescription: { type: graphql.GraphQLString },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPenalty: {
            type: PenaltyType,
            args: {
                PenaltyID: { type: graphql.GraphQLInt },
                PenaltyDescription: { type: graphql.GraphQLString },
            },
            resolve: async (parent, args) => Penalty.create(args),
        },
        deletePenalty: {
            type: graphql.GraphQLString,
            args: {
                PenaltyID: { type: graphql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                await Penalty.remove(args.PenaltyID);
                return 'Penalty deleted successfully!';
            },
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllPenalties: {
            type: new graphql.GraphQLList(PenaltyType),
            resolve: async () => Penalty.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
