import graphqlHttp from 'express-graphql';
import express from 'express';
import schema from './schema';
import rc from 'rc';

import { createHueLoaders } from './context';
import rootValue from './resolvers';

const config = rc('filament', {
  host: '0.0.0.0',
  graphiql: true,
  port: 8080,
});

const graphqlEndpoint = graphqlHttp(() => ({
  context: { hue: createHueLoaders() },
  graphiql: config.graphiql === true,
  rootValue,
  schema,
}));

const app = express();
app.use(graphqlEndpoint);

app.listen(config.port, config.host);
