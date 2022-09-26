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
  },
};

export default resolver;
