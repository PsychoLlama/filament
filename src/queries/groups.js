import { GraphQLList } from 'graphql';

import Group from '../types/Group';
import { fetch } from '../utils';

const addGroupToList = (list, [id, group]) => list.concat({ ...group, id });

export default {
  type: new GraphQLList(Group),
  resolve: async () => {
    const response = await fetch('groups');
    const groups = await response.json();

    return Object.entries(groups).reduce(addGroupToList, []);
  },
};
