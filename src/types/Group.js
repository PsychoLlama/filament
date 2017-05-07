import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

const Action = new GraphQLObjectType({
  name: 'GroupAction',
  fields: {
    xy: { type: new GraphQLList(GraphQLFloat) },
    colormode: { type: GraphQLString },
    effect: { type: GraphQLString },
    alert: { type: GraphQLString },
    on: { type: GraphQLBoolean },
    hue: { type: GraphQLInt },
    sat: { type: GraphQLInt },
    bri: { type: GraphQLInt },
    ct: { type: GraphQLInt },
  },
});

const State = new GraphQLObjectType({
  name: 'GroupState',
  fields: {
    'all_on': { type: GraphQLBoolean },
    'any_on': { type: GraphQLBoolean },
  },
});

export default new GraphQLObjectType({
  name: 'Group',
  fields: {
    lights: { type: new GraphQLList(GraphQLInt) },
    recycle: { type: GraphQLBoolean },
    class: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    id: { type: GraphQLInt },

    action: { type: Action },
    state: { type: State },
  },
});
