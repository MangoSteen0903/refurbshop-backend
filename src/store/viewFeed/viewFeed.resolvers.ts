import { Resolvers } from "../../user/types";

const resolver: Resolvers = {
  Query: {
    viewFeed: (_, __, { client, loggedInUser }) => {
      const Stores = client.store.findMany({
        where: {
          OR: [
            {
              roadAddress: {
                contains: loggedInUser.location,
              },
            },
            {
              jibunAddress: {
                contains: loggedInUser.location,
              },
            },
          ],
        },
      });
      return Stores;
    },
  },
};

export default resolver;
