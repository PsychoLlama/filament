import { GraphQLBoolean } from 'graphql';

export const online = {
  type: GraphQLBoolean,
  resolve: () => true,
};
