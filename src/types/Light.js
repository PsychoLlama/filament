import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

const State = new GraphQLObjectType({
  name: 'LightState',
  fields: {
    xy: { type: new GraphQLList(GraphQLFloat) },
    reachable: { type: GraphQLBoolean },
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
  name: 'Light',
  fields: {
    manufacturername: { type: GraphQLString },
    swversion: { type: GraphQLString },
    uniqueid: { type: GraphQLString },
    modelid: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    id: { type: GraphQLInt },

    state: { type: State },
  },
});
