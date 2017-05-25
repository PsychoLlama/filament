import { GraphQLNonNull, GraphQLInt } from 'graphql';

import Group from '../types/Group';
import { fetch } from '../utils';

export default {
  type: Group,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (type, { id }) => {
    const response = await fetch(`groups/${id}`);
    const group = await response.json();

    return { ...group, id };
  },
};
