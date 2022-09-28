import { Resolvers } from "../user/types";

const resolver: Resolvers = {
  Item: {
    isOutofStock: (root) => {
      const { amount } = root;
      if (amount == 0) {
        return true;
      }
      return false;
    },
    likes: async (root, _, { client }) => {
      const { id } = root;
      const likes = await client.like.count({
        where: {
          itemId: id,
        },
      });
      console.log(likes);
      return 0;
    },
  },
};

export default resolver;
