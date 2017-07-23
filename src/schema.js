import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import { join } from 'path';

const schemaPath = join(__dirname, 'schema.graphql');
const schemaFile = readFileSync(schemaPath, 'utf8');

export default buildSchema(schemaFile);
