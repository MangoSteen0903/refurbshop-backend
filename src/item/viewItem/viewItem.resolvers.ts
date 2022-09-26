import { Resolvers } from "../../user/types";

const resolver: Resolvers = {
  Query: {
    viewItem: async (_, { id }, { client }) => {
      const Item = await client.item.findUnique({
        where: {
          id,
        },
      });
      if (!Item) {
        return {
          ok: false,
          error: "Can't find Item. Please Try again.",
        };
      } else {
        return {
          ok: true,
          item: Item,
        };
      }
    },
  },
};

export default resolver;
