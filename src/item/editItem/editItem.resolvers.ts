import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    editItem: protectedResolver(
      async (
        _,
        { id, name, price, description, image, limitDate, amount },
        { client, loggedInUser }
      ) => {
        let newImageURL = "";
        const item = await client.item.findUnique({ where: { id } });

        if (!item) {
          return {
            ok: false,
            error: "Can't find Item. Try again.",
          };
        }
        const store = await client.store.findUnique({
          where: { id: item.storeId },
        });

        if (image) {
          newImageURL = await uploadToS3(
            `item/${store.id}/${name}`,
            image,
            loggedInUser.id
          );
        }
        if (store.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "You don't have permission to edit this item.",
          };
        }

        const newItem = await client.item.update({
          where: { id },
          data: {
            name,
            price,
            description,
            amount,
            limitDate: new Date(limitDate).toDateString(),
            ...(newImageURL && { image: newImageURL }),
          },
        });

        if (!newItem) {
          return {
            ok: false,
            error: "Can't update Item. Try again.",
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
