import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlHTTP } from 'express-graphql';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

import resolvers from './src/resolvers.js';

const server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3001;

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, 'src', 'schema.graphql'),
  'utf-8'
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

server.use(
  '/api',
  graphqlHTTP({
    schema,
    // rootValue: resolvers,
    // graphiql: true,
  })
);

server.listen(port, () => console.log('Server on port', port));
