import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import { put } from '../utils';

export default {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    on: { type: GraphQLBoolean },
  },
  resolve: async (type, args) => {
    const { id, ...action } = args;
    const response = await put(`lights/${id}/state`, action);
    const json = await response.json();

    json.forEach((result) => {
      if (result.error) {
        throw new Error(result.error.description);
      }
    });

    return true;
  },
};
