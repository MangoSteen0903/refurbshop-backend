import { Resolvers } from "../../user/types";

const resolver: Resolvers = {
  Query: {
    viewReview: async (_, { storeId }, { client }) => {
      const reviews = await client.review.findMany({
        where: {
          storeId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      console.log(reviews);
      return reviews;
    },
  },
};

export default resolver;
