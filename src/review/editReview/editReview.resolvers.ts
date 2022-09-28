import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    editReview: protectedResolver(
      async (_, { id, context, rate }, { client, loggedInUser }) => {
        const review = await client.review.findUnique({ where: { id } });
        if (!review) {
          return {
            ok: false,
            error: "Can't find review. Please Try again.",
          };
        }
        const updatedReview = await client.review.update({
          where: { id },
          data: {
            context,
            rate,
          },
        });
        if (!updatedReview) {
          return {
            ok: false,
            error: "Can't update Review. Please Try again.",
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
