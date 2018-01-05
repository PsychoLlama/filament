import graphqlHttp from 'express-graphql';
import express from 'express';
import rc from 'rc';

import { createHueLoaders } from './context';
import * as rootValue from './resolvers';
import schema from './schema';
import pkg from '../package';

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

app.get('/status', (req, res) => {
  const { name: app, version } = pkg;
  res.status(200).json({ version, app });
});

app.use(graphqlEndpoint);

app.listen(config.port, config.host);
