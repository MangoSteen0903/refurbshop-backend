import { gql } from "apollo-server-express";

export default gql`
  type viewItemResult {
    ok: Boolean!
    error: String
    item: Item
  }
  type Query {
    viewItem(id: Int!): viewItemResult!
  }
`;
