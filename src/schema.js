import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import * as mutations from './mutations';
import * as queries from './queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    description: 'Philips Hue GraphQL API Server',
    fields: queries,
    name: 'Query',
  }),

  mutation: new GraphQLObjectType({
    fields: mutations,
    name: 'Mutation',
  }),
});
