import { gql } from "apollo-server-express";

export default gql`
  type Item {
    id: Int!
    name: String!
    Store: Store!
    price: Int!
    profileImg: String!
  }
`;
