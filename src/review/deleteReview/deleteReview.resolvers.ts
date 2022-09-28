import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteReview: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const review = await client.review.findUnique({ where: { id } });
        if (!review) {
          return {
            ok: false,
            error: "Can't find review. Try again.",
          };
        }
        if (review.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "You don't have permission to delete this review.",
          };
        }
        const deleteReview = await client.review.delete({ where: { id } });
        if (!deleteReview) {
          return {
            ok: false,
            error: "Can't delete review. Please Try again.",
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
