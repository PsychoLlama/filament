import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import { put } from '../utils';

export default {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    transition: { type: GraphQLInt },
    on: { type: GraphQLBoolean },
    hue: { type: GraphQLInt },
    sat: { type: GraphQLInt },
    bri: { type: GraphQLInt },
  },
  resolve: async (type, args) => {
    const { id, transition, ...action } = args;

    // Hue measures transitions in increments of 100ms.
    const transitiontime = typeof transition === 'number'
      ? transition / 100
      : undefined;

    const response = await put(`groups/${id}/action`, {
      transitiontime,
      ...action,
    });

    const json = await response.json();

    json.forEach((result) => {
      if (result.error) {
        throw new Error(result.error.description);
      }
    });

    return true;
  },
};
