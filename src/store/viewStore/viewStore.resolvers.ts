import { Resolvers } from "../../user/types";

const resolver: Resolvers = {
  Query: {
    viewStore: async (_, { id }, { client }) => {
      const store = await client.store.findUnique({ where: { id } });
      return store;
    },
  },
};

export default resolver;
