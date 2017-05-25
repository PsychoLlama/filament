/* eslint-disable camelcase */
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
    const { any_on, all_on, ...groupState } = group.state;

    // Get that snake_case out of our JavaScript.
    const state = group.state ? {
      ...groupState,
      allOn: all_on,
      anyOn: any_on,
    } : undefined;

    return { ...group, id, state };
  },
};
