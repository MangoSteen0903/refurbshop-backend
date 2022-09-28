import { gql } from "apollo-server-express";

export default gql`
  type editReviewResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editReview(id: Int!, context: String, rate: Float): editReviewResult!
  }
`;
