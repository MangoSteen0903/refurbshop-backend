import { gql } from "apollo-server-express";

export default gql`
  type Query {
    viewReview(storeId: Int!): [Review]!
  }
`;
