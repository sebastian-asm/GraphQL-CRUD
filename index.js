import { fileURLToPath } from 'url';
import { graphqlHTTP } from 'express-graphql';
import { join, dirname } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import resolvers from './src/resolvers.js';

const server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// configuraciones
dotenv.config();
server.use(cors());

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, 'src', 'schema.graphql'),
  'utf-8'
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

server.use('/api', graphqlHTTP({ schema, graphiql: true }));

server.listen(process.env.PORT, () =>
  console.log('Server on port', process.env.PORT)
);
