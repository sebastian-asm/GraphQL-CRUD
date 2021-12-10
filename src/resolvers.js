import mutations from './mutations.js';
import queries from './queries.js';

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

export default resolvers;
