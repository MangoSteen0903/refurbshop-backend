import { Resolvers } from "../user/types";

const resolver: Resolvers = {
  Review: {
    isMine: ({ id }, __, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      if (id !== loggedInUser.id) {
        return false;
      }
      return true;
    },
  },
};

export default resolver;
