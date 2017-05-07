import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import * as fields from './fields/index';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    description: 'Philips Hue GraphQL API Server',
    name: 'Query',
    fields,
  }),
});
