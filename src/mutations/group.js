import { put } from '../utils';
import {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const State = new GraphQLInputObjectType({
  name: 'GroupActionInput',
  fields: {
    on: { type: GraphQLBoolean },
  },
});

export default {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    state: { type: new GraphQLNonNull(State) },
  },
  resolve: async (type, args) => {
    const response = await put(`groups/${args.id}/action`, args.state);
    const json = await response.json();

    json.forEach((result) => {
      if (result.error) {
        throw new Error(result.error.description);
      }
    });

    return true;
  },
};
