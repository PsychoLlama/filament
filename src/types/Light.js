import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Light',
  fields: {
    manufacturername: { type: GraphQLString },
    swversion: { type: GraphQLString },
    uniqueid: { type: GraphQLString },
    modelid: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    id: { type: GraphQLInt },
  },
});
