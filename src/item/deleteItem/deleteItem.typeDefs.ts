import { gql } from "apollo-server-express";

export default gql`
  type deleteItemResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteItem(id: Int!): deleteItemResult!
  }
`;
