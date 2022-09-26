import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    createItem: protectedResolver(
      async (
        _,
        { name, price, description, image, limitDate, amount },
        { client, loggedInUser, currentStore }
      ) => {
        let itemImageUrl = "";
        const store = await client.store.findUnique({
          where: { id: currentStore },
        });
        if (!loggedInUser.isOwner) {
          return {
            ok: false,
            error:
              "You can't register item because you're not owner. Please try again.",
          };
        }
        if (!store) {
          return {
            ok: false,
            error:
              "Can't register item. Because Store does not exists. Please Try again.",
          };
        } else if (store.userId != loggedInUser.id) {
          return {
            ok: false,
            error:
              "You Can't register item because you're not owner of this store. Please Try again.",
          };
        }

        if (image) {
          itemImageUrl = await uploadToS3(
            `item/${currentStore}/${name}`,
            image,
            loggedInUser.id
          );
        }
        const newItem = await client.item.create({
          data: {
            name,
            description,
            price,
            limitDate: new Date(limitDate).toDateString(),
            ...(itemImageUrl && { image: itemImageUrl }),
            store: {
              connect: {
                id: currentStore,
              },
            },
            amount,
          },
        });
        console.log(newItem);
        if (!newItem) {
          return {
            ok: false,
            error: "Can't create Item.",
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
