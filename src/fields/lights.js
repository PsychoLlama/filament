import { GraphQLList } from 'graphql';

import Light from '../types/Light';
import { fetch } from '../utils';

const addLightToList = (list, [id, light]) => list.concat({ ...light, id });

export default {
  type: new GraphQLList(Light),
  resolve: async () => {
    const response = await fetch('lights');
    const data = await response.json();

    return Object.entries(data).reduce(addLightToList, []);
  },
};
