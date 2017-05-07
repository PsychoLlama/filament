import { graphql } from 'graphql';

import schema from '../schema';

export const query = ([request]) => graphql(schema, request);
