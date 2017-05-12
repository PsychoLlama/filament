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
    await put(`groups/${args.id}/action`, args.state);

    return true;
  },
};
