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

export default new GraphQLObjectType({
  name: 'Group',
  fields: {
    lights: { type: new GraphQLList(GraphQLInt) },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    id: { type: GraphQLInt },

    action: { type: Action },
  },
});
