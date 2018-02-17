import graphqlHttp from 'express-graphql';
import express from 'express';
import schema from './schema';
import rc from 'rc';

import { createHueLoaders } from './context';
import * as rootValue from './resolvers';

const config = rc('filament', {
  host: '0.0.0.0',
  graphiql: true,
  port: 8080,
});

const graphqlEndpoint = graphqlHttp(() => {
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
          timing: stats.requestPerformance,
          requests: stats.requestCount,
        },
      };
    },
  };
});

const app = express();

app.get('/status', (req, res) => res.status(200).end('Online'));
app.use(graphqlEndpoint);

app.listen(config.port, config.host);
