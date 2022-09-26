import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type EditItemResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editItem(
      id: Int!
      name: String
      price: Int
      description: String
      image: Upload
      limitDate: String
      amount: Int
    ): EditItemResult!
  }
`;
