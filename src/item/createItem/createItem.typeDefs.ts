import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type createStoreResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createItem(
      name: String!
      price: Int!
      description: String
      image: Upload
      limitDate: String!
    ): createStoreResult!
  }
`;
