import { gql } from "apollo-server-express";

export default gql`
  type Item {
    id: Int!
    name: String!
    price: Int!
    description: String
    image: String
    limitDate: String!
    amount: Int!
    isOutofStock: Boolean!
    store: Store
  }
`;
