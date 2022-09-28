import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const item = await client.item.findUnique({ where: { id } });
        if (!item) {
          return {
            ok: false,
            error: "Can't find item. Please Try again.",
          };
        }
        const likeLink = {
          itemId_userId: {
            itemId: id,
            userId: loggedInUser.id,
          },
        };
        const like = await client.like.findUnique({
          where: likeLink,
        });

        if (like) {
          await client.like.delete({
            where: {
              id: like.id,
            },
          });
        } else {
          await client.like.create({
            data: {
              item: {
                connect: {
                  id,
                },
              },
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
