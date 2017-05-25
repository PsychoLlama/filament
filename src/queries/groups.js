/* eslint-disable camelcase */
import { GraphQLList } from 'graphql';

import Group from '../types/Group';
import { fetch } from '../utils';

const addGroupToList = (list, [id, group]) => {
  const { any_on, all_on, groupState } = group.state;

  const state = {
    ...groupState,
    allOn: all_on,
    anyOn: any_on,
  };

  return list.concat({ ...group, state, id });
};

export default {
  type: new GraphQLList(Group),
  resolve: async () => {
    const response = await fetch('groups');
    const groups = await response.json();

    return Object.entries(groups).reduce(addGroupToList, []);
  },
};
