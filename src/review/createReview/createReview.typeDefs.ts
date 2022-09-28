import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type createReviewResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createReview(
      storeId: Int!
      itemId: Int!
      context: String!
      rate: Float!
      image: Upload
    ): createReviewResult!
  }
`;
