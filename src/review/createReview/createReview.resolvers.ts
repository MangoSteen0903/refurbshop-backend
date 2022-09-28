import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    createReview: protectedResolver(
      async (
        _,
        { storeId, itemId, context, rate, image },
        { client, loggedInUser }
      ) => {
        let reviewImageURL = null;
        const store = await client.store.findFirst({ where: { id: storeId } });
        const item = await client.item.findFirst({ where: { id: itemId } });
        if (!store || !item) {
          return {
            ok: false,
            error: "Can't find store / item. Please try again.",
          };
        }
        if (image) {
          reviewImageURL = await uploadToS3(
            `review/${loggedInUser.id}/${storeId}/${itemId}`,
            image,
            loggedInUser.id
          );
        }
        const newReview = await client.review.create({
          data: {
            context,
            rate,
            item: {
              connect: {
                id: itemId,
              },
            },
            store: {
              connect: {
                id: storeId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(reviewImageURL && { image: reviewImageURL }),
          },
        });
        if (!newReview) {
          return {
            ok: false,
            error: "Can't create Review. Please try again.",
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
