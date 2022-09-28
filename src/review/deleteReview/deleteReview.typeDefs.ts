import { gql } from "apollo-server-express";

export default gql`
  type deleteReviewResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteReview(id: Int!): deleteReviewResult!
  }
`;
