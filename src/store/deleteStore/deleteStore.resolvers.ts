import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteStore: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const store = await client.store.findUnique({ where: { id } });
        if (!store) {
          return {
            ok: false,
            error:
              "Store that you looking for is not exists. Please Try again.",
          };
        } else if (store.userId !== loggedInUser.id) {
          return {
            ok: false,
            error:
              "Store that you tried to delete is not yours. Please Try again.",
          };
        }
        const deleteStore = await client.store.delete({ where: { id } });
        console.log(deleteStore);
        if (!deleteStore) {
          return {
            ok: false,
            error: "Can't delete Store.",
          };
        } else {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolver;
