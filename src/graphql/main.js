import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CartController } from './controllers/cart.controller.js';

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: {
        ... CartController.queries
    }
})

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: {
        ... CartController.mutations
    }
})

export default new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})