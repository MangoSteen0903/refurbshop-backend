import { Resolvers } from "./types";

const resolvers: Resolvers = {
  User: {
    wishlist: async (root, _, { client }) => {
      const { id } = root;
      const items = await client.item.findMany({
        where: {
          Like: {
            some: {
              userId: id,
            },
          },
        },
        select: {
          name: true,
          price: true,
          limitDate: true,
          store: {
            select: {
              name: true,
            },
          },
        },
      });
      return items;
    },
  },
};

export default resolvers;
