import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteItem: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const item = await client.item.findUnique({ where: { id } });
        const store = await client.store.findUnique({
          where: { id: item.storeId },
        });
        if (store.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "You don't have permission to delete this item.",
          };
        }
        if (!item) {
          return {
            ok: false,
            error: "Can't find item. Please Try again.",
          };
        } else {
          const deleteItem = await client.item.delete({ where: { id } });
          if (!deleteItem) {
            return {
              ok: false,
              error: "Can't delete item. Please Try again.",
            };
          } else {
            return {
              ok: true,
            };
          }
        }
      }
    ),
  },
};

export default resolver;
