import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    viewUser: async (_, { username }, { client }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "Can't find user. Please Try again.",
        };
      } else {
        return {
          ok: true,
          user,
        };
      }
    },
  },
};

export default resolvers;
