import mutations from './mutations.js';
import queries from './queries.js';
import types from './types.js';

const resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types,
};

export default resolvers;
