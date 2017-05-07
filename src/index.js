import graphqlHttp from 'express-graphql';
import express from 'express';

import * as fields from './fields';
import schema from './schema';

const graphqlEndpoint = graphqlHttp({
  rootValue: fields,
  graphiql: true,
  schema,
});

const app = express();
app.use(graphqlEndpoint);

app.listen(8080);
