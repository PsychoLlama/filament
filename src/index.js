import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFile } from 'fs';
import express from 'express';
import { join } from 'path';
import rc from 'rc';

import * as resolvers from './resolvers';
import * as context from './context';

const config = rc('filament', {
  host: '0.0.0.0',
  graphiql: true,
  port: 8080,
});

const schemaPath = join(__dirname, 'schema.graphql');
readFile(schemaPath, 'utf8', (error, result) => {
  if (error) {
    throw error;
  }

  const schema = buildSchema(result);
  const graphqlEndpoint = graphqlHttp({
    graphiql: config.graphiql === true,
    context,
    schema,

    rootValue: {
      hue: () => resolvers,
    },
  });

  const app = express();
  app.use(graphqlEndpoint);

  app.listen(config.port, config.host);
});
