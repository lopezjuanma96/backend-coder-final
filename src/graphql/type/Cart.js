import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

export default CartType = new GraphQLObjectType({
    name: 'Cart',
    description: 'Cart Type',
    fields: () => ({
        id : { type: GraphQLID },
        user : { type: GraphQLString },
        products : { type: new GraphQLList(GraphQLID) },
        creation : { type: GraphQLInt },
        lastUpdate : { type: GraphQLInt }
    })
})