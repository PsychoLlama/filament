import {
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import Light from '../types/Light';
import { fetch } from '../utils';

export default {
  type: Light,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (type, { id }) => {
    const response = await fetch(`lights/${id}`);
    const light = await response.json();

    return { ...light, id };
  },
};
