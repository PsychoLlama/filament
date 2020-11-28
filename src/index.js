import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import Raven from 'raven';
import rc from 'rc';

import { createHueLoaders } from './context';
import * as rootValue from './resolvers';
import schema from './schema';
import pkg from '../package';

const config = rc('filament', {
  sentryKey: null,
  host: '0.0.0.0',
  graphiql: true,
  port: 8080,
});

const graphqlEndpoint = graphqlHTTP(() => {
  const requestStartTime = Date.now();
  const hue = createHueLoaders();

  return {
    context: { hue },
    graphiql: config.graphiql === true,
    rootValue,
    schema,
    extensions: () => {
      const stats = hue.getRequestStats();

      return {
        performance: {
          elapsed: Date.now() - requestStartTime,
          requests: stats.requests,
        },
      };
    },
  };
});

const app = express();

app.get('/status', (req, res) => {
  const { name: app, version } = pkg;
  res.status(200).json({ version, app });
});

app.use(graphqlEndpoint);

app.listen(config.port, config.host);

// Sentry reporting (optional).
if (config.sentryKey) {
  Raven.config(config.sentryKey).install();
}
