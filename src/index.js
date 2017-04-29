import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import graphqlHttp from 'express-graphql';
import express from 'express';

import * as fields from './selectables';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    description: 'Philips Hue GraphQL API Server',
    fields: () => fields,
    name: 'Query',
  }),
});

const graphqlEndpoint = graphqlHttp({
  rootValue: fields,
  graphiql: true,
  schema,
});

const app = express();
app.use(graphqlEndpoint);

app.listen(8080);
